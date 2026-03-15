from fastapi import FastAPI
import joblib
from fastapi.middleware.cors import CORSMiddleware
import re
from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import uuid
from difflib import SequenceMatcher

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


@app.get("/")
def home():
    return {"message": "Phishing Email Detection API"}


@app.post("/predict")
def predict(email: str, sender: str = ""):

    # ---------- Sender Analysis ----------
    sender_domain = ""

    if sender and "@" in sender:
        sender_domain = sender.split("@")[1].lower()

    suspicious_tlds = [".xyz", ".top", ".ru", ".tk", ".ml"]
    suspicious_tld = any(sender_domain.endswith(tld) for tld in suspicious_tlds)

    # ---------- Typo-squatting detection ----------
    trusted_domains = [
        "paypal.com",
        "amazon.com",
        "google.com",
        "apple.com",
        "microsoft.com"
    ]

    impersonation = None

    for domain in trusted_domains:
        similarity = SequenceMatcher(None, sender_domain, domain).ratio()

        if similarity > 0.8 and sender_domain != domain:
            impersonation = domain
            break

    # ---------- ML prediction ----------
    vec = vectorizer.transform([email])

    prediction = model.predict(vec)[0]
    probability = model.predict_proba(vec)[0][1]

    feature_names = vectorizer.get_feature_names_out()
    weights = model.coef_[0]

    words = email.lower().split()

    keywords = []

    for word in words:
        if word in feature_names:
            index = list(feature_names).index(word)
            if weights[index] > 0:
                keywords.append(word)

    keywords = list(set(keywords))[:5]

    # ---------- URL detection ----------
    urls = re.findall(r'https?://\S+', email)

    # ---------- Risk score ----------
    keyword_score = min(len(keywords) * 4, 20)
    url_score = min(len(urls) * 20, 20)

    risk_score = int((probability * 60) + keyword_score + url_score)

    # ---------- Threat level ----------
    if risk_score >= 80:
        threat = "HIGH"
    elif risk_score >= 50:
        threat = "MEDIUM"
    else:
        threat = "LOW"

    urgent_words = ["urgent", "immediately", "verify", "suspend", "alert", "action"]
    urgent_detected = any(word in email.lower() for word in urgent_words)

    result = "Phishing" if prediction == 1 else "Legitimate"

    return {
        "prediction": result,
        "confidence": float(probability),
        "keywords": keywords,
        "urls": urls,
        "risk_score": risk_score,
        "threat_level": threat,
        "urgent_language": urgent_detected,
        "sender_domain": sender_domain,
        "suspicious_tld": suspicious_tld,
        "impersonation_detected": impersonation
    }


# ---------------- PDF REPORT (UNCHANGED CONTENT) ----------------

@app.get("/generate-report")
def generate_report(email: str):

    vec = vectorizer.transform([email])
    prediction = model.predict(vec)[0]
    probability = model.predict_proba(vec)[0][1]

    feature_names = vectorizer.get_feature_names_out()
    weights = model.coef_[0]

    words = email.lower().split()
    keywords = []

    for word in words:
        if word in feature_names:
            index = list(feature_names).index(word)
            if weights[index] > 0:
                keywords.append(word)

    keywords = list(set(keywords))[:5]

    urls = re.findall(r'https?://\S+', email)

    keyword_score = min(len(keywords) * 4, 20)
    url_score = min(len(urls) * 20, 20)

    risk_score = int((probability * 60) + keyword_score + url_score)

    if risk_score >= 80:
        threat = "HIGH"
    elif risk_score >= 50:
        threat = "MEDIUM"
    else:
        threat = "LOW"

    urgent_words = ["urgent", "immediately", "verify", "suspend", "alert", "action"]
    urgent_detected = any(word in email.lower() for word in urgent_words)

    result = "Phishing" if prediction == 1 else "Legitimate"

    filename = f"report_{uuid.uuid4()}.pdf"

    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Email Threat Analysis Report", styles["Title"]))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph(f"Prediction: {result}", styles["Normal"]))
    elements.append(Paragraph(f"Confidence: {probability:.2f}", styles["Normal"]))
    elements.append(Paragraph(f"Threat Level: {threat}", styles["Normal"]))
    elements.append(Paragraph(f"Risk Score: {risk_score}/100", styles["Normal"]))

    elements.append(Spacer(1, 20))

    elements.append(Paragraph("Detected Issues:", styles["Heading3"]))

    if keywords:
        elements.append(Paragraph("✔ Suspicious keywords", styles["Normal"]))

    if urls:
        elements.append(Paragraph("✔ Malicious URL", styles["Normal"]))

    if urgent_detected:
        elements.append(Paragraph("✔ Urgent language pattern", styles["Normal"]))

    elements.append(Spacer(1, 20))

    if keywords:
        elements.append(Paragraph(f"Keywords: {', '.join(keywords)}", styles["Normal"]))

    if urls:
        elements.append(Paragraph(f"Detected Links: {', '.join(urls)}", styles["Normal"]))

    doc = SimpleDocTemplate(filename)
    doc.build(elements)

    return FileResponse(filename, filename="email_security_report.pdf")