// src/app/shipping/page.tsx

export default function ShippingReturnsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Shipping & Returns
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Shipping Information
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We offer several shipping options to meet your needs. All orders are processed within 1-2 business days.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Domestic Shipping
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
              <li>Standard Shipping: 3-5 business days.</li>
              <li>Express Shipping: 1-2 business days.</li>
              <li>Shipping costs are calculated at checkout based on your location and order weight.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              International Shipping
            </h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>International shipping times vary depending on the destination.</li>
              <li>Customs fees and taxes are the responsibility of the customer.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Returns & Exchanges
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not happy with your order, we are here to help.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Return Policy
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
              <li>Items can be returned within 30 days of delivery.</li>
              <li>Items must be unused, in their original packaging, and in the same condition that you received them.</li>
              <li>To initiate a return, please contact our support team.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Exchanges
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you would like to exchange an item, please contact our customer service. We will guide you through the process.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}