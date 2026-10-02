// src/app/terms/page.tsx

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Terms of Service
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">2. User Accounts</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the service.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">3. Intellectual Property</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The service and its original content, features, and functionality are and will remain the exclusive property of [Your Store Name] and its licensors.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">4. Termination</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">5. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In no event shall [Your Store Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, or consequential damages.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">6. Changes to Terms</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}