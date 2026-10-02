// src/components/ContactPage.tsx
'use client';

import React from 'react';
import { FaEnvelope, FaPhone, FaHome } from 'react-icons/fa'; // Icons from react-icons/fa

// यह कंपोनेंट एक professional और stylish 'Contact Us' पेज बनाता है।
// यह तुम्हारी वेबसाइट के मौजूदा काले और सफेद थीम से मेल खाता है।

const ContactPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Contact & Support
        </h1>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Email Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaEnvelope className="text-4xl text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Email Us</h2>
            <p className="text-gray-400">Support@lizzshop.com</p> {/* यहाँ अपनी ईमेल डालना */}
          </div>
          
          {/* Call Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaPhone className="text-4xl text-green-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Call Us</h2>
            <p className="text-gray-400">+91 9826360033</p> {/* यहाँ अपना फ़ोन नंबर डालना */}
          </div>
          
          {/* Address Card */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
            <FaHome className="text-4xl text-purple-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Contact Address</h2>
            <p className="text-gray-400">
              MIG-341, 80 Feet Rd, Anna Nagar, Madurai - 625020, Tamil Nadu, India.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-gray-700 text-white p-4 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="bg-gray-700 text-white p-4 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-4 px-8 rounded-lg font-semibold md:col-span-2 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
