"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [sender, setSender] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const analyzeEmail = async () => {
    if (!email.trim()) return;
    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/predict?email=${encodeURIComponent(email)}&sender=${encodeURIComponent(sender)}`,
      { method: "POST" }
    );

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-white"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Background */}
        <div
          className={`absolute inset-0 ${
            darkMode ? "opacity-10" : "opacity-5"
          } transition-opacity duration-500`}
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(79, 172, 254, 0.05) 25%, rgba(79, 172, 254, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.05) 75%, rgba(79, 172, 254, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(79, 172, 254, 0.05) 25%, rgba(79, 172, 254, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.05) 75%, rgba(79, 172, 254, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2s"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4s"></div>
      </div>

      {/* Header with Theme Toggle */}
      <div className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div>
          <h1
            className={`text-4xl md:text-5xl font-black bg-clip-text bg-gradient-to-r ${
              darkMode
                ? "from-blue-400 via-cyan-400 to-blue-300"
                : "from-blue-600 via-cyan-600 to-blue-500"
            } text-transparent`}
          >
            SecureCheck
          </h1>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-blue-300/70" : "text-blue-600/60"
            }`}
          >
            AI-Powered Phishing Detection
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative group px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            darkMode
              ? "bg-white/10 hover:bg-white/20 text-blue-200 backdrop-blur-md border border-white/20"
              : "bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 backdrop-blur-md border border-slate-900/20"
          }`}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-start px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* LEFT SIDE - Input Panel */}
          <div
            className={`flex-1 p-6 md:p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              darkMode
                ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                : "bg-white/60 border-white/40 hover:bg-white/80 hover:border-white/60"
            }`}
          >
            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-3 ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                📧 Sender Email
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10"
                    : "bg-white/80 border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white"
                }`}
                placeholder="attacker@example.com"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-3 ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                ✉️ Email Content
              </label>
              <textarea
                className={`w-full px-4 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                  darkMode
                    ? "bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10"
                    : "bg-white/80 border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white"
                }`}
                rows="8"
                placeholder="Paste the email content here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={analyzeEmail}
              disabled={loading || !email.trim()}
              className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60"
              }`}
            >
              {loading ? "🔍 Analyzing..." : "🔍 Scan Email"}
            </button>

            {/* Results Preview */}
            {result && (
              <div
                className={`mt-6 p-4 rounded-xl border-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${
                  result.prediction === "Phishing"
                    ? darkMode
                      ? "bg-red-900/20 border-red-500/50"
                      : "bg-red-50/80 border-red-300"
                    : darkMode
                    ? "bg-green-900/20 border-green-500/50"
                    : "bg-green-50/80 border-green-300"
                }`}
              >
                <p
                  className={`text-center text-2xl font-bold ${
                    result.prediction === "Phishing"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {result.prediction === "Phishing" ? "⚠️ PHISHING" : "✅ SAFE"}
                </p>
                <p
                  className={`text-center mt-2 ${
                    darkMode ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Security Report Card */}
          {result && (
            <div
              className={`flex-1 p-6 md:p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 animate-in fade-in slide-in-from-right-4 ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-white/40"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                🛡️ Security Report
              </h2>

              {/* Threat Level */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold mb-2 ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  THREAT LEVEL
                </p>
                <p
                  className={`text-3xl font-black ${
                    result.threat_level === "HIGH"
                      ? "text-red-500"
                      : result.threat_level === "MEDIUM"
                      ? "text-amber-500"
                      : "text-emerald-500"
                  }`}
                >
                  {result.threat_level}
                </p>
              </div>

              {/* Risk Score with Advanced Visualization */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold mb-3 ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  RISK SCORE: {result.risk_score}/100
                </p>
                <div
                  className={`relative h-3 rounded-full overflow-hidden backdrop-blur-sm ${
                    darkMode ? "bg-white/10" : "bg-white/50"
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      result.risk_score >= 80
                        ? "bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50"
                        : result.risk_score >= 50
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50"
                        : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50"
                    }`}
                    style={{ width: `${result.risk_score}%` }}
                  />
                </div>
              </div>

              {/* Detected Issues */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold mb-3 ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  DETECTED ISSUES
                </p>
                <ul className="space-y-2">
                  {result.keywords?.length > 0 && (
                    <li
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        darkMode ? "bg-red-500/10" : "bg-red-50/80"
                      }`}
                    >
                      <span className="text-red-500">⚡</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-red-400" : "text-red-700"
                        }`}
                      >
                        Suspicious keywords detected
                      </span>
                    </li>
                  )}

                  {result.urls?.length > 0 && (
                    <li
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        darkMode ? "bg-red-500/10" : "bg-red-50/80"
                      }`}
                    >
                      <span className="text-red-500">🔗</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-red-400" : "text-red-700"
                        }`}
                      >
                        Malicious URLs found
                      </span>
                    </li>
                  )}

                  {result.urgent_language && (
                    <li
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        darkMode ? "bg-amber-500/10" : "bg-amber-50/80"
                      }`}
                    >
                      <span className="text-amber-500">⏰</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        Urgent language patterns
                      </span>
                    </li>
                  )}

                  {result.suspicious_tld && (
                    <li
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        darkMode ? "bg-red-500/10" : "bg-red-50/80"
                      }`}
                    >
                      <span className="text-red-500">🌐</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-red-400" : "text-red-700"
                        }`}
                      >
                        Suspicious domain TLD
                      </span>
                    </li>
                  )}

                  {result.impersonation_detected && (
                    <li
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        darkMode ? "bg-amber-500/10" : "bg-amber-50/80"
                      }`}
                    >
                      <span className="text-amber-500">👤</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        Impersonation of {result.impersonation_detected}
                      </span>
                    </li>
                  )}

                  {!result.keywords?.length &&
                    !result.urls?.length &&
                    !result.urgent_language &&
                    !result.suspicious_tld &&
                    !result.impersonation_detected && (
                      <li
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          darkMode ? "bg-emerald-500/10" : "bg-emerald-50/80"
                        }`}
                      >
                        <span className="text-emerald-500">✓</span>
                        <span
                          className={`text-sm ${
                            darkMode
                              ? "text-emerald-400"
                              : "text-emerald-700"
                          }`}
                        >
                          No issues detected
                        </span>
                      </li>
                    )}
                </ul>
              </div>

              {/* Additional Details */}
              {result.sender_domain && (
                <div className="mb-4 pb-4 border-t border-white/10">
                  <p
                    className={`text-xs font-semibold mb-2 ${
                      darkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    SENDER DOMAIN
                  </p>
                  <p
                    className={`font-mono text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {result.sender_domain}
                  </p>
                </div>
              )}

              {result.keywords?.length > 0 && (
                <div className="mb-4 pb-4 border-t border-white/10">
                  <p
                    className={`text-xs font-semibold mb-2 ${
                      darkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    KEYWORDS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-red-500/20 text-red-400"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.urls?.length > 0 && (
                <div className="mb-4 pb-4 border-t border-white/10">
                  <p
                    className={`text-xs font-semibold mb-2 ${
                      darkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    DETECTED URLs
                  </p>
                  <ul className="space-y-1">
                    {result.urls.map((url, i) => (
                      <li
                        key={i}
                        className={`text-xs truncate font-mono ${
                          darkMode ? "text-red-400" : "text-red-600"
                        }`}
                        title={url}
                      >
                        🔗 {url}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() =>
                  window.open(
                    `http://127.0.0.1:8000/generate-report?email=${encodeURIComponent(
                      email
                    )}`
                  )
                }
                className={`w-full mt-6 py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  darkMode
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70"
                    : "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60"
                }`}
              >
                📥 Download Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2s {
          animation-delay: 2s;
        }

        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}