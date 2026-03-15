"use client";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {

    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/predict?email=${encodeURIComponent(email)}`,
      { method: "POST" }
    );

    const data = await response.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-8 gap-10">

      {/* LEFT SIDE */}
      <div className="flex flex-col items-center w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          AI Phishing Email Detector
        </h1>

        <textarea
          className="border p-4 w-full rounded"
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

        {loading && (
          <p className="mt-4 text-gray-500">
            Analyzing email...
          </p>
        )}

        {result && (
          <div className="mt-6 text-center">

            <p className={`text-xl font-bold ${
              result.prediction === "Phishing"
                ? "text-red-600"
                : "text-green-600"
            }`}>
              Prediction: {result.prediction}
            </p>

            <p className="text-lg">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>

          </div>
        )}

      </div>

      {/* RIGHT SIDE SECURITY REPORT */}
      {result && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded w-80 shadow-lg">

          <h2 className="text-xl font-bold mb-4">
            Email Security Report
          </h2>

          <p className="mb-2">
            <b>Threat Level:</b>{" "}
            <span className={
              result.threat_level === "HIGH"
                ? "text-red-500"
                : result.threat_level === "MEDIUM"
                ? "text-yellow-400"
                : "text-green-400"
            }>
              {result.threat_level}
            </span>
          </p>

          <p className="mb-2">
            <b>Risk Score:</b> {result.risk_score}/100
          </p>

          {/* Threat Meter */}
          <div className="w-full bg-gray-700 rounded h-4 mb-4">
            <div
              className={`h-4 rounded ${
                result.risk_score >= 80
                  ? "bg-red-500"
                  : result.risk_score >= 50
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${result.risk_score}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs mb-4 text-gray-400">
            <span>LOW</span>
            <span>MEDIUM</span>
            <span>HIGH</span>
          </div>

          <p className="font-semibold mb-2">
            Detected Issues:
          </p>

          <ul className="space-y-1 mb-4">

            {result.keywords?.length > 0 && (
              <li className="text-red-400">
                ✔ Suspicious keywords
              </li>
            )}

            {result.urls?.length > 0 && (
              <li className="text-red-400">
                ✔ Malicious URL
              </li>
            )}

            {result.urgent_language && (
              <li className="text-yellow-400">
                ✔ Urgent language pattern
              </li>
            )}

          </ul>

          {/* SHOW KEYWORDS */}
          {result.keywords?.length > 0 && (
            <div className="mb-3">
              <p className="font-semibold">Keywords:</p>
              <p className="text-red-400">
                {result.keywords.join(", ")}
              </p>
            </div>
          )}

          {/* SHOW URLS */}
          {result.urls?.length > 0 && (
            <div>
              <p className="font-semibold">Detected Links:</p>
              <ul className="text-red-400">
                {result.urls.map((url, i) => (
                  <li key={i}>{url}</li>
                ))}
              </ul>
            </div>
          )}
          <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() =>
          window.open(
            `http://127.0.0.1:8000/generate-report?email=${encodeURIComponent(email)}`
          )
        }
      >
        Download Security Report
      </button>
        </div>
        
      )}
      
    </div>
  );
}