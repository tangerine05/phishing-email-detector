"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TrainingModule() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [userBadges, setUserBadges] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);

  // Quiz Data
  const quizzes = [
    {
      id: 1,
      question:
        "Which of these is NOT a common phishing indicator?",
      options: [
        "Urgent request for sensitive information",
        "Professional email address from known company domain",
        "Suspicious sender address that looks similar to official",
        "Unexpected attachment from unknown sender",
      ],
      correct: 1,
      explanation:
        "A professional email address from a known company domain is a legitimate sign. Always verify sender addresses carefully!",
    },
    {
      id: 2,
      question:
        "What should you do if you receive a suspicious email from 'your bank'?",
      options: [
        "Click the link to verify your account immediately",
        "Call your bank using the number on your bank card",
        "Reply with your account details to verify",
        "Forward it to other customers",
      ],
      correct: 1,
      explanation:
        "Always contact official numbers from verified sources. Never use links or contact info from suspicious emails!",
    },
    {
      id: 3,
      question: "What is a common phishing technique?",
      options: [
        "Asking for feedback on your shopping experience",
        "Creating urgency to pressure you into action",
        "Sending legitimate offers from companies",
        "Providing clear contact information",
      ],
      correct: 1,
      explanation:
        "Phishers create false urgency ('Act now!' 'Your account will be closed!') to bypass your critical thinking.",
    },
    {
      id: 4,
      question: "Which URL is suspicious?",
      options: [
        "https://www.amazon.com/account",
        "https://www.amaz0n.com/account",
        "https://secure.amazon.com/login",
        "https://amazon.secure-login.com",
      ],
      correct: 1,
      explanation:
        "Notice the zero '0' instead of 'o'! Always check URLs carefully. Phishers use similar-looking domains.",
    },
    {
      id: 5,
      question: "What is typosquatting?",
      options: [
        "Making spelling mistakes in emails",
        "Using domains similar to legitimate ones to trick users",
        "Clicking links with typos",
        "Sending emails with subject line typos",
      ],
      correct: 1,
      explanation:
        "Typosquatting uses domains like 'amaz0n.com' or 'goog1e.com' that look like real sites but aren't.",
    },
  ];

  // Training Modules
  const trainingModules = [
    {
      id: "recognizing",
      title: "🔍 Recognizing Phishing Emails",
      description: "Learn to identify common phishing email characteristics",
      content: [
        {
          heading: "Suspicious Sender Addresses",
          text: "Phishers often use email addresses that look similar to legitimate ones. Look carefully:\n\n• Real: support@amazon.com\n• Phishing: support@amaz0n.com (note the zero)\n• Real: noreply@banks.example.com\n• Phishing: noreply@bank-secure.xyz\n\nAlways verify the FULL email address, not just the display name.",
        },
        {
          heading: "Urgent Language & Threats",
          text: "Phishers create false urgency to bypass your thinking:\n\n❌ 'Your account will be closed in 24 hours!'\n❌ 'Verify your identity immediately!'\n❌ 'Suspicious activity detected - act now!'\n❌ 'You've won a prize! Claim it now!'\n\n✅ Legitimate companies rarely create artificial urgency.\n✅ They won't threaten to close accounts via email.",
        },
        {
          heading: "Suspicious Links",
          text: "Always inspect URLs before clicking:\n\n• Hover over links to see the actual URL\n• Look for HTTPS (secure) connections\n• Check if domain matches the company name\n• Be wary of shortened URLs (bit.ly, tinyurl)\n• Never click links in unexpected emails\n\nInstead: Go directly to the official website by typing the address yourself.",
        },
        {
          heading: "Unexpected Attachments",
          text: "Attachments are common phishing vectors:\n\n⚠️ Be cautious with:\n• EXE, ZIP, SCR files\n• Unexpected Microsoft Office documents\n• Files from unknown senders\n\n✅ Best practice:\n• Ask the sender before opening\n• Use antivirus software\n• Scan suspicious files\n• Disable macros in Office documents",
        },
        {
          heading: "Poor Grammar & Spelling",
          text: "Professional companies proofread their emails. Phishing emails often have:\n\n• Grammatical errors: 'Please confirm your account and password'\n• Spelling mistakes: 'Verify you're accout information'\n• Awkward phrasing: 'Dear customer, we demand you verify'\n• Inconsistent formatting: Multiple font sizes and colors\n• Generic greetings: 'Dear Customer' vs your actual name\n\nLegitimate banks know your name and don't make silly mistakes.",
        },
      ],
    },
    {
      id: "protecting",
      title: "🛡️ Protecting Yourself",
      description: "Essential security practices to prevent phishing attacks",
      content: [
        {
          heading: "Strong Passwords",
          text: "Create passwords that are hard to guess:\n\n✅ DO:\n• Use 12+ characters\n• Mix uppercase, lowercase, numbers, symbols\n• Use unique passwords for each account\n• Use a password manager\n\n❌ DON'T:\n• Use personal information (birthdate, pet names)\n• Reuse passwords across sites\n• Use dictionary words\n• Write passwords down\n\nExample good password: 7Kx#mP2@vL9$w4nQ",
        },
        {
          heading: "Two-Factor Authentication (2FA)",
          text: "Add an extra layer of protection:\n\n2FA requires TWO things to log in:\n1. Your password\n2. A code from your phone/authenticator\n\nEven if someone has your password, they can't log in without the second factor.\n\n✅ Use 2FA on:\n• Email account\n• Bank account\n• Social media\n• Important services\n\nMethods: Authenticator app, SMS, fingerprint, security key",
        },
        {
          heading: "Email & Account Security",
          text: "Protect your main email account (it can reset other passwords):\n\n• Enable 2FA on your email\n• Use a strong, unique password\n• Enable login alerts\n• Review connected apps\n• Check forwarding rules\n\nRegularly:\n• Review login activity\n• Update security questions\n• Remove unused connected accounts\n• Change passwords periodically",
        },
        {
          heading: "Verify Before You Act",
          text: "When you receive an unusual request:\n\n1. STOP - Don't click anything\n2. VERIFY - Contact the company directly\n   • Use phone number from official website\n   • NOT from the email\n   • NOT using 'Reply' or links\n3. CHECK - Ask yourself:\n   • Does this make sense?\n   • Would the company really ask this?\n   • Am I being pressured?\n4. REPORT - If suspicious:\n   • Report to the company\n   • Forward to anti-phishing services\n   • Mark as spam/phishing",
        },
        {
          heading: "Use Security Tools",
          text: "Technology can help protect you:\n\n✅ Antivirus software: Detects malware\n✅ Email filters: Catches phishing emails\n✅ Browser extensions: Warns about suspicious sites\n✅ VPN: Encrypts your connection\n✅ Password manager: Generates strong passwords\n✅ Authenticator apps: Provides 2FA codes\n\nKeep your:\n• Operating system updated\n• Browser updated\n• Software up to date\n\nUnsupported software has known vulnerabilities.",
        },
      ],
    },
    {
      id: "realworld",
      title: "🌍 Real-World Examples",
      description: "Compare real vs phishing emails to sharpen your skills",
      content: [
        {
          heading: "Amazon Phishing Example",
          text: "PHISHING EMAIL:\n\n❌ From: amazon-security@amazons.net\n❌ Subject: Urgent: Confirm Your Amazon Account\n❌ 'Dear Customer, Your account is at risk!'\n❌ 'Click here immediately to verify your credentials'\n❌ Link: https://amaz0n-security.net/verify\n❌ 'If you don't act now, your account will be closed!'\n\nREAL AMAZON EMAIL:\n\n✅ From: account-update@amazon.com\n✅ Addresses you by name\n✅ Explains specific action\n✅ Direct link to amazon.com\n✅ No artificial urgency\n✅ Professional tone",
        },
        {
          heading: "Bank Phishing Example",
          text: "PHISHING EMAIL:\n\n❌ From: security@bank-verify.xyz\n❌ 'Suspicious activity on your account'\n❌ Asks for: Account number, PIN, SSN\n❌ 'Confirm your information by replying'\n❌ Generic: 'Dear Valued Customer'\n❌ Poor grammar: 'We are requiring you confirm'\n\nREAL BANK EMAIL:\n\n✅ Uses your actual bank's domain\n✅ Addresses you by name\n✅ Never asks for passwords/PIN\n✅ Has official logo/branding\n✅ Professional formatting\n✅ Suggests: Call or visit branch\n✅ No attachments with personal links",
        },
        {
          heading: "Malware Distribution",
          text: "PHISHING EMAIL:\n\n❌ From: noreply@delivery-service.com\n❌ 'Package delivery failed'\n❌ 'Click to reschedule'\n❌ Attachment: 'Delivery_Form.zip'\n❌ Link to suspicious domain\n❌ You weren't expecting a delivery\n\nWhat happens if you click:\n• Malware is downloaded\n• Your computer is infected\n• Passwords are stolen\n• Your identity can be used for fraud\n\nREAL DELIVERY EMAIL:\n\n✅ From official company domain\n✅ Has tracking number\n✅ Link to official website\n✅ No unexpected attachments\n✅ Professional appearance",
        },
        {
          heading: "Tax Refund Scam",
          text: "PHISHING EMAIL:\n\n❌ 'You're entitled to a tax refund!'\n❌ 'Click here to claim'\n❌ Asks for: SSN, DOB, bank info\n❌ 'Refund expires in 48 hours!'\n❌ Suspicious domain\n\nREALITY:\n\n✅ IRS never initiates contact by email\n✅ They contact by mail only\n✅ They never ask for sensitive info via email\n✅ Real refunds come via check or direct deposit\n✅ Always go to irs.gov directly\n\nThe legitimate IRS website is IRS.GOV\nNot: irss.gov, irs-refund.com, etc.",
        },
        {
          heading: "CEO Fraud",
          text: "PHISHING EMAIL:\n\n❌ From: ceo@company.com (spoofed)\n❌ Urgent request for money transfer\n❌ 'Don't tell anyone, keep this confidential!'\n❌ Unusual payment request\n❌ Created sense of urgency\n\nREAL SCENARIO:\n\n✅ CEO wouldn't email for money transfers\n✅ Real requests go through proper channels\n✅ Always verify through normal procedures\n✅ Legitimate request = official documentation\n✅ Ask: Is this normal for our company?\n\nIf suspicious:\n1. Call the CEO\n2. Email from a known good address\n3. Use company phone directory\n4. Never reply to the suspicious email",
        },
      ],
    },
    {
      id: "workplace",
      title: "💼 Phishing at Work",
      description: "Protect your company and colleagues from phishing",
      content: [
        {
          heading: "Why Companies Are Targeted",
          text: "Phishers target businesses because:\n\n💰 Money: Direct wire fraud\n💳 Data: Customer information to sell\n🔐 Access: Credentials to access systems\n🎯 Reputation: Damage company credibility\n📧 Email lists: Use for mass attacks\n\nOne employee falling for phishing can:\n• Compromise entire company network\n• Expose customer data\n• Cost thousands in recovery\n• Damage company reputation\n• Result in legal liability",
        },
        {
          heading: "Company Email Security",
          text: "Best practices for work email:\n\n✅ DO:\n• Report suspicious emails immediately\n• Follow company security policies\n• Use VPN on public WiFi\n• Lock your computer when away\n• Use company-provided security tools\n• Attend security training\n\n❌ DON'T:\n• Share credentials with anyone\n• Click suspicious links\n• Download files from unknown sources\n• Check personal email on work devices\n• Connect to public WiFi without VPN\n• Ignore security warnings",
        },
        {
          heading: "Reporting & Response",
          text: "If you receive a suspicious email:\n\n1. REPORT:\n   • To your IT department\n   • Forward the email\n   • Include 'PHISHING' in subject\n\n2. DON'T:\n   • Reply to the email\n   • Click any links\n   • Download attachments\n   • Share with other employees\n\n3. DELETE:\n   • After reporting\n   • Don't keep it open\n\n4. HELP:\n   • Alert your team\n   • Share what to watch for\n   • Support those who report\n   • Create learning opportunity",
        },
        {
          heading: "Security Culture",
          text: "Build a phishing-resistant workplace:\n\n• Regular training for all staff\n• Encourage reporting without blame\n• Praise people who report phishing\n• Test employees with training emails\n• Share lessons learned\n• Have clear reporting procedures\n• Implement technical controls\n• Executive support for security\n\nCompanies with strong security culture:\n• Catch more phishing attempts\n• Respond faster to incidents\n• Have fewer successful breaches\n• Build trusted teams",
        },
      ],
    },
  ];

  // Load user data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("phishingTrainingData");
    if (saved) {
      const data = JSON.parse(saved);
      setUserBadges(data.badges || []);
      setCompletedModules(data.completedModules || []);
    }
  }, []);

  // Save user data to localStorage
  const saveUserData = (badges, completed) => {
    localStorage.setItem(
      "phishingTrainingData",
      JSON.stringify({
        badges,
        completedModules: completed,
      })
    );
  };

  // Handle quiz answer
  const handleQuizAnswer = (optionIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    const correctAnswers = quizzes.filter(
      (quiz, idx) => quizAnswers[idx] === quiz.correct
    ).length;

    const score = Math.round((correctAnswers / quizzes.length) * 100);

    if (score >= 80) {
      const newBadges = [...userBadges, "phishing-expert"];
      setUserBadges(newBadges);
      saveUserData(newBadges, completedModules);
    }

    setQuizSubmitted(true);
  };

  // Mark module as completed
  const markModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      saveUserData(userBadges, updated);

      // Award badge if all modules done
      if (updated.length === trainingModules.length && !userBadges.includes("master-trainer")) {
        const newBadges = [...userBadges, "master-trainer"];
        setUserBadges(newBadges);
        saveUserData(newBadges, updated);
      }
    }
  };

  const currentModule = trainingModules.find((m) => m.id === activeSection);
  const correctAnswers = quizSubmitted
    ? quizzes.filter((quiz, idx) => quizAnswers[idx] === quiz.correct).length
    : 0;
  const quizScore = quizSubmitted
    ? Math.round((correctAnswers / quizzes.length) * 100)
    : 0;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-white"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${
            darkMode ? "opacity-10" : "opacity-5"
          } transition-opacity duration-500`}
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(147, 51, 234, 0.05) 25%, rgba(147, 51, 234, 0.05) 26%, transparent 27%, transparent 74%, rgba(147, 51, 234, 0.05) 75%, rgba(147, 51, 234, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-10 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2s"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 flex justify-between items-center p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className={`p-2 rounded-lg transition-all ${
              darkMode
                ? "hover:bg-white/10 text-blue-300"
                : "hover:bg-slate-900/10 text-blue-700"
            }`}
          >
            ← Back
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-transparent">
              🎓 Phishing Awareness Training
            </h1>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-purple-300/70" : "text-purple-600/60"
              }`}
            >
              Learn to identify and avoid phishing attacks
            </p>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            darkMode
              ? "bg-white/10 hover:bg-white/20 text-purple-200"
              : "bg-slate-900/10 hover:bg-slate-900/20 text-slate-700"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* User Progress */}
          <div
            className={`mb-8 p-6 rounded-2xl backdrop-blur-xl border transition-all ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/60 border-white/40"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                📊 Your Progress
              </h2>
              <div className="flex gap-3">
                {userBadges.includes("phishing-expert") && (
                  <span className="text-3xl" title="Phishing Expert">
                    🏆
                  </span>
                )}
                {userBadges.includes("master-trainer") && (
                  <span className="text-3xl" title="Master Trainer">
                    👑
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? "bg-white/5" : "bg-white/50"}`}>
                <p className={`text-sm ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                  Modules Completed
                </p>
                <p className="text-2xl font-bold text-purple-400">
                  {completedModules.length}/{trainingModules.length}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-white/5" : "bg-white/50"}`}>
                <p className={`text-sm ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                  Quiz Score
                </p>
                <p className="text-2xl font-bold text-pink-400">
                  {quizScore > 0 ? quizScore : "—"}%
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-white/5" : "bg-white/50"}`}>
                <p className={`text-sm ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                  Badges Earned
                </p>
                <p className="text-2xl font-bold text-yellow-400">
                  {userBadges.length}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-white/5" : "bg-white/50"}`}>
                <p className={`text-sm ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                  Learning Status
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {completedModules.length === 0 ? "Starting" : "In Progress"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSection("overview")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeSection === "overview"
                    ? darkMode
                      ? "bg-purple-600 text-white"
                      : "bg-purple-600 text-white"
                    : darkMode
                    ? "bg-white/5 text-purple-300 hover:bg-white/10"
                    : "bg-white/50 text-purple-700 hover:bg-white/70"
                }`}
              >
                📚 Overview
              </button>
              {trainingModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveSection(module.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeSection === module.id
                      ? darkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-600 text-white"
                      : darkMode
                      ? "bg-white/5 text-purple-300 hover:bg-white/10"
                      : "bg-white/50 text-purple-700 hover:bg-white/70"
                  }`}
                >
                  {module.title.split(" ")[0]}
                  {completedModules.includes(module.id) && " ✓"}
                </button>
              ))}
              <button
                onClick={() => setActiveSection("quiz")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeSection === "quiz"
                    ? darkMode
                      ? "bg-purple-600 text-white"
                      : "bg-purple-600 text-white"
                    : darkMode
                    ? "bg-white/5 text-purple-300 hover:bg-white/10"
                    : "bg-white/50 text-purple-700 hover:bg-white/70"
                }`}
              >
                ❓ Quiz
              </button>
            </div>
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div
              className={`p-8 rounded-2xl backdrop-blur-xl border transition-all animate-in fade-in ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-white/40"
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
                Welcome to Phishing Awareness Training! 🎓
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                    What is Phishing?
                  </h3>
                  <p
                    className={`text-lg leading-relaxed ${
                      darkMode ? "text-white/80" : "text-slate-700"
                    }`}
                  >
                    Phishing is a social engineering attack where criminals impersonate trusted
                    organizations to steal sensitive information like passwords, credit cards, or
                    personal data. Most phishing attempts use email, but also appear in SMS, social
                    media, and phone calls.
                  </p>
                </div>

                <div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                    Why This Training Matters
                  </h3>
                  <ul
                    className={`list-none space-y-3 text-lg ${
                      darkMode ? "text-white/80" : "text-slate-700"
                    }`}
                  >
                    <li className="flex gap-3">
                      <span>📧</span>
                      <span>
                        <strong>73% of data breaches</strong> involve social engineering (phishing)
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span>💰</span>
                      <span>
                        <strong>$3.4 billion</strong> lost to phishing annually in the US alone
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span>🎯</span>
                      <span>
                        <strong>Businesses lose</strong> $17,700 per minute to phishing attacks
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span>👤</span>
                      <span>
                        <strong>One compromised credential</strong> can compromise entire networks
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingModules.map((module) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                          darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white/50 hover:bg-white/70"
                        }`}
                        onClick={() => setActiveSection(module.id)}
                      >
                        <h4 className={`font-bold ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                          {module.title}
                        </h4>
                        <p
                          className={`text-sm mt-1 ${
                            darkMode ? "text-white/70" : "text-slate-600"
                          }`}
                        >
                          {module.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg border-l-4 ${
                    darkMode
                      ? "bg-blue-500/10 border-blue-500 text-blue-300"
                      : "bg-blue-50 border-blue-500 text-blue-700"
                  }`}
                >
                  <p className="font-bold mb-2">💡 Pro Tip:</p>
                  <p>
                    When you complete all modules and score 80% or higher on the quiz, you'll earn
                    the "Phishing Expert" badge! Complete everything to become a "Master Trainer"!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Training Module Content */}
          {currentModule && activeSection !== "overview" && activeSection !== "quiz" && (
            <div
              className={`p-8 rounded-2xl backdrop-blur-xl border transition-all animate-in fade-in ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-white/40"
              }`}
            >
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                {currentModule.title}
              </h2>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-white/70" : "text-slate-600"
                }`}
              >
                {currentModule.description}
              </p>

              <div className="space-y-8">
                {currentModule.content.map((section, idx) => (
                  <div key={idx}>
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        darkMode ? "text-purple-300" : "text-purple-700"
                      }`}
                    >
                      {section.heading}
                    </h3>
                    <p
                      className={`text-lg leading-relaxed whitespace-pre-wrap ${
                        darkMode ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => markModuleComplete(currentModule.id)}
                disabled={completedModules.includes(currentModule.id)}
                className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  completedModules.includes(currentModule.id)
                    ? darkMode
                      ? "bg-green-500/30 text-green-300 cursor-default"
                      : "bg-green-100 text-green-700 cursor-default"
                    : darkMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/40"
                }`}
              >
                {completedModules.includes(currentModule.id)
                  ? "✓ Module Completed"
                  : "✓ Mark as Completed"}
              </button>
            </div>
          )}

          {/* Quiz Section */}
          {activeSection === "quiz" && (
            <div
              className={`p-8 rounded-2xl backdrop-blur-xl border transition-all animate-in fade-in ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white/60 border-white/40"
              }`}
            >
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                📝 Phishing Awareness Quiz
              </h2>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-white/70" : "text-slate-600"
                }`}
              >
                Test your knowledge! Score 80% or higher to earn the "Phishing Expert" badge.
              </p>

              {!quizSubmitted ? (
                <div>
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Question {currentQuizIndex + 1} of {quizzes.length}
                      </span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        {Math.round(((currentQuizIndex + 1) / quizzes.length) * 100)}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${darkMode ? "bg-white/10" : "bg-white/50"}`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                        style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3
                      className={`text-2xl font-bold mb-6 ${
                        darkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {quizzes[currentQuizIndex].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {quizzes[currentQuizIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                            quizAnswers[currentQuizIndex] === idx
                              ? darkMode
                                ? "bg-purple-600 text-white border-2 border-purple-400"
                                : "bg-purple-600 text-white border-2 border-purple-400"
                              : darkMode
                              ? "bg-white/5 text-white border-2 border-white/10 hover:bg-white/10"
                              : "bg-white/50 text-slate-900 border-2 border-white/40 hover:bg-white/70"
                          }`}
                        >
                          <span className="mr-3">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentQuizIndex(Math.max(0, currentQuizIndex - 1))}
                      disabled={currentQuizIndex === 0}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        currentQuizIndex === 0
                          ? darkMode
                            ? "bg-white/5 text-white/50 cursor-not-allowed"
                            : "bg-white/30 text-slate-400 cursor-not-allowed"
                          : darkMode
                          ? "bg-white/10 text-white hover:bg-white/20"
                          : "bg-white/50 text-slate-900 hover:bg-white/70"
                      }`}
                    >
                      ← Previous
                    </button>

                    {currentQuizIndex === quizzes.length - 1 ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.length !== quizzes.length}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                          quizAnswers.length !== quizzes.length
                            ? darkMode
                              ? "bg-white/5 text-white/50 cursor-not-allowed"
                              : "bg-white/30 text-slate-400 cursor-not-allowed"
                            : darkMode
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50"
                            : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/40"
                        }`}
                      >
                        🏆 Submit Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setCurrentQuizIndex(
                            Math.min(quizzes.length - 1, currentQuizIndex + 1)
                          )
                        }
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                          darkMode
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/40"
                        }`}
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Results */}
                  <div className="text-center mb-8">
                    <h3
                      className={`text-4xl font-bold mb-4 ${
                        quizScore >= 80 ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {quizScore >= 80 ? "🎉 Excellent!" : "Good Try!"}
                    </h3>
                    <div
                      className={`text-6xl font-bold mb-4 ${
                        quizScore >= 80 ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {quizScore}%
                    </div>
                    <p
                      className={`text-xl ${
                        darkMode ? "text-white/80" : "text-slate-700"
                      }`}
                    >
                      You got {correctAnswers} out of {quizzes.length} questions correct!
                    </p>

                    {quizScore >= 80 && !userBadges.includes("phishing-expert") && (
                      <div className="mt-6 text-3xl animate-bounce">
                        🏆 Badge Earned: Phishing Expert!
                      </div>
                    )}
                  </div>

                  {/* Review Answers */}
                  <div className="space-y-6 mb-8">
                    {quizzes.map((quiz, idx) => (
                      <div
                        key={idx}
                        className={`p-6 rounded-lg border-l-4 ${
                          quizAnswers[idx] === quiz.correct
                            ? darkMode
                              ? "bg-green-500/10 border-green-500"
                              : "bg-green-50 border-green-500"
                            : darkMode
                            ? "bg-red-500/10 border-red-500"
                            : "bg-red-50 border-red-500"
                        }`}
                      >
                        <div className="flex gap-3 mb-2">
                          <span>
                            {quizAnswers[idx] === quiz.correct ? "✓" : "✗"}
                          </span>
                          <p
                            className={`font-semibold ${
                              quizAnswers[idx] === quiz.correct
                                ? darkMode
                                  ? "text-green-400"
                                  : "text-green-700"
                                : darkMode
                                ? "text-red-400"
                                : "text-red-700"
                            }`}
                          >
                            Question {idx + 1}: {quiz.question}
                          </p>
                        </div>
                        <p className={`text-sm mb-2 ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                          <span className="font-semibold">Your answer:</span>{" "}
                          {quiz.options[quizAnswers[idx]]}
                        </p>
                        {quizAnswers[idx] !== quiz.correct && (
                          <p className={`text-sm mb-2 ${darkMode ? "text-white/70" : "text-slate-600"}`}>
                            <span className="font-semibold">Correct answer:</span>{" "}
                            {quiz.options[quiz.correct]}
                          </p>
                        )}
                        <p
                          className={`text-sm italic ${
                            darkMode ? "text-white/60" : "text-slate-500"
                          }`}
                        >
                          💡 {quiz.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Retry Button */}
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setCurrentQuizIndex(0);
                      setQuizAnswers([]);
                    }}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      darkMode
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/40"
                    }`}
                  >
                    🔄 Retake Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
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
      `}</style>
    </div>
  );
}