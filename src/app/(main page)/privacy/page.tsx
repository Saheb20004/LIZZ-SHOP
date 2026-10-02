export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide when creating an account, placing an order, or contacting us — including your name, email address, shipping address, and payment details. We also collect usage data such as pages visited and products viewed to improve your experience.' },
    { title: '2. How We Use Your Information', content: 'Your information is used to process and fulfill orders, send order confirmations and shipping updates, provide customer support, improve our website and services, and send promotional emails (only if you opt in). We never sell your personal data to third parties.' },
    { title: '3. Payment Security', content: 'All payments are processed through Stripe, a PCI DSS Level 1 certified payment processor. We do not store your card details on our servers. Your payment information is encrypted and handled securely by Stripe.' },
    { title: '4. Cookies', content: 'We use cookies to maintain your session, remember your cart, and analyze website traffic. You can disable cookies in your browser settings, but some features of the website may not function properly.' },
    { title: '5. Data Sharing', content: 'We share your data only with trusted service providers necessary to operate our business — including Stripe (payments), Clerk (authentication), MongoDB (database), and Resend (email). All partners are bound by strict data protection agreements.' },
    { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@lizzshop.com. We will respond within 30 days.' },
    { title: '7. Data Retention', content: 'We retain your personal data for as long as your account is active or as needed to provide services. Order data is retained for 7 years for legal and accounting purposes.' },
    { title: '8. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance.' },
    { title: '9. Contact Us', content: 'For any privacy-related questions or concerns, contact us at: support@lizzshop.com or write to us at Lizz Shop, Mumbai, Maharashtra, India.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Last updated: October 2024</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 sm:p-10 space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            At Lizz Shop, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website and services.
          </p>
          {sections.map(({ title, content }) => (
            <div key={title}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
