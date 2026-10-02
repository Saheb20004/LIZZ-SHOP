import { FaTruck, FaUndo, FaBoxOpen } from 'react-icons/fa';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 lg:px-10 py-10 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">Policies</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Shipping & Returns</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: FaTruck, title: 'Fast Delivery', desc: 'Orders delivered in 3-5 business days across India' },
            { icon: FaBoxOpen, title: 'Free Shipping', desc: 'Free shipping on all orders above ₹999' },
            { icon: FaUndo, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center">
              <Icon className="mx-auto text-gray-700 dark:text-gray-300 mb-3" size={28} />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {[
            {
              title: 'Shipping Information',
              items: [
                'Standard Shipping (3–5 business days): ₹99 or FREE on orders above ₹999',
                'Express Shipping (1–2 business days): ₹199',
                'All orders are processed within 1–2 business days',
                'You will receive a tracking number via email once your order ships',
                'We currently ship across all major cities and towns in India',
              ],
            },
            {
              title: 'Return Policy',
              items: [
                'Items can be returned within 7 days of delivery',
                'Items must be unused, unwashed, and in original packaging with tags attached',
                'Sale items and innerwear are not eligible for return',
                'To initiate a return, contact us at raut.hit2024@gmail.com with your order ID',
                'Refunds are processed within 5–7 business days after we receive the item',
              ],
            },
            {
              title: 'Exchange Policy',
              items: [
                'Exchanges are accepted within 7 days of delivery for size or colour issues',
                'The replacement item will be shipped once we receive the original',
                'Exchange shipping is free for the first exchange per order',
                'Contact our support team to initiate an exchange',
              ],
            },
          ].map(({ title, items }) => (
            <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
