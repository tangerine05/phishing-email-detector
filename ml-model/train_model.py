import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

files = [
"dataset/CEAS_08.csv",
"dataset/Enron.csv",
"dataset/Ling.csv",
"dataset/Nazario.csv",
"dataset/Nigerian_Fraud.csv",
"dataset/phishing_email.csv",
"dataset/SpamAssasin.csv"
]

dataframes = []

for file in files:
    df = pd.read_csv(file)

    # Find text column
    text_col = None
    for col in df.columns:
        if "text" in col.lower() or "body" in col.lower() or "email" in col.lower():
            text_col = col

    # Find label column
    label_col = None
    for col in df.columns:
        if "label" in col.lower() or "type" in col.lower():
            label_col = col

    if text_col and label_col:
        df = df[[text_col, label_col]]
        df.columns = ["text","label"]
        dataframes.append(df)

data = pd.concat(dataframes, ignore_index=True)

print("Total emails:", len(data))

# Clean text
def clean_text(text):

    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z ]','', text)

    return text

data["text"] = data["text"].apply(clean_text)

# TF-IDF
vectorizer = TfidfVectorizer(max_features=5000)

X = vectorizer.fit_transform(data["text"])
y = data["label"]

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
X, y, test_size=0.2, random_state=42
)

# Train model
model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)

# Evaluate
pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, pred))

# Save model
joblib.dump(model,"phishing_model.pkl")
joblib.dump(vectorizer,"vectorizer.pkl")