from fastapi import FastAPI
import joblib
from fastapi.middleware.cors import CORSMiddleware

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

# Load ML model
model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.get("/")
def home():
    return {"message": "Phishing Email Detection API"}

@app.post("/predict")
def predict(email: str):

    # Convert email to vector
    vec = vectorizer.transform([email])

    prediction = model.predict(vec)[0]
    probability = model.predict_proba(vec)[0][1]

    if prediction == 1:
        result = "Phishing"
    else:
        result = "Legitimate"

    return {
        "prediction": result,
        "confidence": float(probability)
    }