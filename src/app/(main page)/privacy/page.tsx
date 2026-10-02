// src/app/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Introduction</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our website. We are committed to ensuring the privacy and security of your data.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">2. Information We Collect</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We collect information you provide directly to us, such as your name, email address, shipping address, and payment details when you make a purchase.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
              <li>To process and fulfill your orders.</li>
              <li>To communicate with you about your account or orders.</li>
              <li>To improve our products and services.</li>
              <li>To send you marketing and promotional communications (if you have opted in).</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">4. Data Security</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We use robust security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">5. Your Rights</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You have the right to access, correct, or delete your personal data. If you have any questions or concerns, please contact us.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: your_email@example.com
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}