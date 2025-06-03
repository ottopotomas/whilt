// src/app/terms/page.tsx

import React from "react";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-base leading-relaxed text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Effective Date: [Insert Launch Date]</p>

      <section id="about" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. About WHILT</h2>
        <p>
          WHILT (short for “What Have I Learned Today?”) is a personal knowledge
          platform that helps you retain what you learn each day through spaced
          repetition, AI-powered reviews, and community support. When you log a
          TIL (“Today I Learned”), WHILT helps you embed that knowledge and
          connect ideas over time.
        </p>
      </section>

      <section id="eligibility" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the age of digital consent in
          your country) to use WHILT. By using the Service, you confirm that you
          meet this requirement.
        </p>
      </section>

      <section id="account" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Your Account</h2>
        <ul className="list-disc list-inside">
          <li>You’re responsible for keeping your login credentials secure.</li>
          <li>You may not use WHILT for any unlawful or harmful activity.</li>
          <li>You may delete your account at any time via the Settings page.</li>
        </ul>
      </section>

      <section id="your-content" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Your Content</h2>
        <p>
          You retain ownership of all content you submit to WHILT, including
          TILs, comments, and uploaded media. By submitting public content, you
          grant WHILT a non-exclusive, royalty-free license to display, share,
          and promote that content within the platform and related services. You
          are responsible for ensuring your content is accurate, lawful, and
          respectful.
        </p>
      </section>

      <section id="ai" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. AI-Generated Suggestions</h2>
        <p>
          WHILT uses AI to support your learning through suggested reviews,
          related TILs, and personalized testing. These suggestions are intended
          as learning aids and may not always be accurate or complete. Use
          critical thinking and seek additional sources when needed.
        </p>
      </section>

      <section id="premium" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Premium Features</h2>
        <p>
          Some features are only available through a paid subscription (e.g.,
          smarter review cycles, Capy Explorer rewards, expert learning packs).
          By subscribing, you agree to the pricing and billing terms shown at
          checkout. Subscriptions may renew automatically unless canceled.
        </p>
      </section>

      <section id="community" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Community Guidelines</h2>
        <p className="mb-2">
          WHILT is a space built on curiosity, encouragement, and shared
          learning. We encourage:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Genuine sharing of insights and learnings</li>
          <li>Thoughtful and respectful discussion</li>
          <li>Constructive comments and feedback</li>
          <li>Celebrating the progress of others</li>
        </ul>
        <p className="mb-2">We do not allow:</p>
        <ul className="list-disc list-inside">
          <li>Insults, mockery, or harassment</li>
          <li>Harmful, hateful, or discriminatory content</li>
          <li>Spam, plagiarism, or misleading information</li>
          <li>Using WHILT to stir conflict or disrupt learning</li>
        </ul>
        <p className="mt-2">
          We reserve the right to remove content or suspend accounts that
          violate these values. WHILT is not a platform for hostile debate — it
          is a space for intentional, respectful growth.
        </p>
      </section>

      <section id="illegal" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Illegal and Inappropriate Content</h2>
        <p>
          You may not upload or share any content that:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Violates any applicable laws or regulations</li>
          <li>Contains hate speech, threats, or harassment</li>
          <li>Encourages violence, self-harm, or exploitation</li>
          <li>Includes nudity or sexually explicit material</li>
          <li>Infringes on intellectual property rights</li>
          <li>Spreads misinformation or deceptive content</li>
        </ul>
        <p>
          Violations may result in immediate content removal and account
          suspension. Please report any concerns to{" "}
          <a
            href="mailto:support@whilt.app"
            className="text-blue-600 underline"
          >
            support@whilt.app
          </a>
          .
        </p>
      </section>

      <section id="termination" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at our
          discretion, especially in cases of repeated or severe violations of
          these Terms or our community guidelines.
        </p>
      </section>

      <section id="modifications" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">10. Modifications to the Service</h2>
        <p>
          WHILT may evolve over time. We reserve the right to add, remove, or
          modify features at any time. We’ll aim to communicate major changes
          clearly, especially if they impact your use of the Service.
        </p>
      </section>

      <section id="liability" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">11. Limitation of Liability</h2>
        <p>
          WHILT is provided “as is.” We do not guarantee accuracy,
          uninterrupted access, or perfect results. We are not liable for any
          indirect or consequential damages arising from your use of the
          Service.
        </p>
      </section>

      <section id="privacy" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">12. Privacy</h2>
        <p>
          Your use of WHILT is also governed by our{" "}
          <a
            href="/privacy"
            className="text-blue-600 underline"
          >
            Privacy Policy
          </a>
          , which explains how we collect, store, and use your data.
        </p>
      </section>

      <section id="law" className="mb-8">
        <h2 className="text-xl font-semibold mb-2">13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the United Kingdom, unless
          otherwise required by local law.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-xl font-semibold mb-2">14. Contact</h2>
        <p>
          If you have any questions, concerns, or requests, please reach out to
          us at{" "}
          <a
            href="mailto:support@whilt.app"
            className="text-blue-600 underline"
          >
            support@whilt.app
          </a>
          .
        </p>
      </section>
    </main>
  );
}
