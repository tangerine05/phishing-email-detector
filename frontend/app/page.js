"use client";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const analyzeEmail = async () => {

    const response = await fetch(
      `http://127.0.0.1:8000/predict?email=${encodeURIComponent(email)}`,
      {
        method: "POST"
      }
    );

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Phishing Email Detector
      </h1>

      <textarea
        className="border p-4 w-full max-w-xl rounded"
        rows="6"
        placeholder="Paste email text here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={analyzeEmail}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Analyze Email
      </button>

      {result && (
        <div className="mt-6 text-center">

          <p className="text-xl">
            Prediction: <b>{result.prediction}</b>
          </p>

          <p>
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </p>

        </div>
      )}

    </div>
  );
}