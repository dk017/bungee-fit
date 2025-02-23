import { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | BungeeFitnessNear.me",
  description:
    "Get in touch with us for any questions about bungee fitness studios or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Thank you for your interest in BungeeFitnessNear.me. Whether you
            have questions, feedback, or would like to partner with us, we'd
            love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <a
                    href="mailto:contact@bungeefitnessnear.me"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    contact@bungeefitnessnear.me
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">United States</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/disclaimer"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
