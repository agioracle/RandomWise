import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Terms of Service</h1>
        <p className="mb-4 text-gray-300 max-w-2xl text-center">
          Welcome to RandomWise! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our site, you agree to comply with and be bound by these Terms.
        </p>
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. Acceptance of Terms</h2>
          <p className="mb-4 text-gray-300">
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. Use of Service</h2>
          <p className="mb-4 text-gray-300">
            You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for your use of the site and any content you provide.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. Intellectual Property</h2>
          <p className="mb-4 text-gray-300">
            All content, trademarks, and data on this site, including but not limited to text, graphics, logos, and software, are the property of RandomWise or its licensors and are protected by applicable intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Disclaimers</h2>
          <p className="mb-4 text-gray-300">
            Our website and services are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation or availability of the site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Limitation of Liability</h2>
          <p className="mb-4 text-gray-300">
            To the fullest extent permitted by law, RandomWise shall not be liable for any damages arising out of your use or inability to use the site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">6. Changes to Terms</h2>
          <p className="mb-4 text-gray-300">
            We reserve the right to update or modify these Terms at any time. Changes will be effective upon posting to this page.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">7. Contact Us</h2>
          <p className="mb-4 text-gray-300">
            If you have any questions about these Terms, please contact us at <a href="mailto:info@randomwise.app" className="text-primary">info@randomwise.app</a>.
          </p>
        </div>
      </main>
      <Footer className="bg-[#0A0A1B] text-gray-400" />
    </div>
  );
}
