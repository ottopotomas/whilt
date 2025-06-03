// src/app/privacy/page.tsx

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-base leading-relaxed text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Effective Date: [Insert Launch Date]</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          WHILT (“What Have I Learned Today?”, “we”, “our”, or “us”) is committed
          to protecting your personal data and respecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your
          information when you use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. What We Collect</h2>
        <p>We collect the following types of data:</p>
        <ul className="list-disc list-inside mt-2">
          <li><strong>Account Info:</strong> Email address, username, and login credentials.</li>
          <li><strong>TIL Content:</strong> Any text, comments, or media you submit.</li>
          <li><strong>Usage Data:</strong> Learning streaks, test performance, feature use.</li>
          <li><strong>Device Data:</strong> Browser type, IP address, operating system.</li>
          <li><strong>AI Activity:</strong> Interactions with AI-generated suggestions or tests.</li>
          <li><strong>Payment Info:</strong> If you subscribe to Premium, billing is handled securely by a third-party provider. We do not store full payment details.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
        <ul className="list-disc list-inside">
          <li>To provide and personalize your WHILT experience</li>
          <li>To track your learning progress and suggest review material</li>
          <li>To send important notifications (e.g., test reminders, account changes)</li>
          <li>To improve WHILT through aggregated analytics</li>
          <li>To offer Premium features if subscribed</li>
          <li>To comply with legal obligations and prevent misuse</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. AI and Personalization</h2>
        <p>
          WHILT uses AI to enhance your learning experience by analyzing your
          behavior, performance, and preferences. This includes:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Adapting test frequency and format based on memory patterns</li>
          <li>Suggesting related TILs or articles you may find useful</li>
          <li>Generating review questions and feedback on essay responses (Premium)</li>
        </ul>
        <p className="mt-2">
          All AI activity is used solely to benefit your learning and is not sold to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Sharing and Visibility</h2>
        <p>
          By default, your TILs may be shared publicly on WHILT’s feed unless
          marked as private. You control whether each TIL is public or private.
        </p>
        <p className="mt-2">
          Other users can view, comment on, and engage with your public TILs. WHILT does not sell your individual data or allow third parties to access your private submissions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
        <p>
          We retain your data as long as your account is active. You may delete
          your account at any time, which will permanently remove your TILs,
          test history, and profile data from our systems (excluding any anonymized aggregate analytics).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Cookies & Tracking</h2>
        <p>
          WHILT uses cookies and tracking tools to help us understand user
          behavior and improve the platform. You can manage cookies through your
          browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Data Protection & Security</h2>
        <p>
          We implement industry-standard security measures to protect your data.
          While no system is 100% secure, we take all reasonable steps to protect
          your information from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Your Rights</h2>
        <p>
          If you're located in the UK, EU, or California, you have the right to:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent or object to data processing</li>
          <li>Request a copy of your data (data portability)</li>
        </ul>
        <p className="mt-2">
          To make a request, email{" "}
          <a href="mailto:support@whilt.app" className="text-blue-600 underline">
            support@whilt.app
          </a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in the platform or
          legal requirements. We will notify users of any material changes and
          update the “Effective Date” at the top of the page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">11. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy or your personal
          data, contact us at{" "}
          <a href="mailto:support@whilt.app" className="text-blue-600 underline">
            support@whilt.app
          </a>.
        </p>
      </section>
    </main>
  );
}
