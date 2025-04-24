import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Privacy Policy</h1>
        <p className="mb-4 text-gray-300 max-w-2xl text-center">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
        </p>
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. Information We Collect</h2>
          <p className="mb-4 text-gray-300">
            We may collect information you provide directly to us, such as when you contact us or use our services. This may include your name, email address, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-300">
            We use the information we collect to operate, maintain, and improve our website and services, respond to your inquiries, and communicate with you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. Information Sharing</h2>
          <p className="mb-4 text-gray-300">
            We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Data Security</h2>
          <p className="mb-4 text-gray-300">
            We implement reasonable measures to protect your information from unauthorized access, disclosure, or loss. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Changes to This Policy</h2>
          <p className="mb-4 text-gray-300">
            We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">6. Contact Us</h2>
          <p className="mb-4 text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at support@example.com.
          </p>
        </div>
      </main>
      <Footer className="bg-[#0A0A1B] text-gray-400" />
    </div>
  );
}
