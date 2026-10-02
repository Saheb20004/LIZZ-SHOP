export default function TermsPage() {
  const sections = [
    { title: '1. Agreement to Terms', content: 'By accessing or using Lizz Shop, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.' },
    { title: '2. User Accounts', content: 'You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.' },
    { title: '3. Products & Pricing', content: 'We reserve the right to modify product descriptions, prices, and availability at any time without notice. Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.' },
    { title: '4. Orders & Payments', content: 'By placing an order, you confirm that the information provided is accurate and that you are authorized to use the payment method. We reserve the right to cancel orders in cases of pricing errors, fraud, or stock unavailability.' },
    { title: '5. Intellectual Property', content: 'All content on this website — including logos, images, text, and design — is the exclusive property of Lizz Shop and is protected by copyright law. You may not reproduce, distribute, or use our content without written permission.' },
    { title: '6. Prohibited Activities', content: 'You agree not to use our platform for any unlawful purpose, to transmit harmful or offensive content, to attempt to gain unauthorized access to our systems, or to engage in any activity that disrupts our services.' },
    { title: '7. Limitation of Liability', content: 'Lizz Shop shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to loss of profits, data, or goodwill.' },
    { title: '8. Governing Law', content: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.' },
    { title: '9. Changes to Terms', content: 'We reserve the right to modify these Terms at any time. We will provide at least 30 days notice before new terms take effect. Continued use of our services after changes constitutes acceptance of the new terms.' },
    { title: '10. Contact', content: 'For questions about these Terms, contact us at support@lizzshop.com or write to Lizz Shop, Mumbai, Maharashtra, India.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Terms of Service</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Last updated: October 2024</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 sm:p-10 space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Please read these Terms of Service carefully before using Lizz Shop. These terms govern your use of our website and services.
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
