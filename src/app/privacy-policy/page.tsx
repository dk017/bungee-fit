import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BungeeFitnessNear.me",
  description:
    "Privacy policy and data collection practices for BungeeFitnessNear.me",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-purple max-w-none space-y-8">
          <section>
            <p className="text-gray-700">
              This privacy statement explains what information
              BungeeFitnessNear.me collects when you browse our site, why we
              collect it, and how you can manage your data.
            </p>
            <p className="text-gray-700 mt-4">
              If anything here is unclear, please contact us—we want you to feel
              confident about your privacy choices. Please contact us at{" "}
              <a
                href="mailto:contact@bungeefitnessnear.me"
                className="text-purple-600 hover:text-purple-700"
              >
                contact@bungeefitnessnear.me
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Summary of Key Points
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Personal Information Collection:</strong> We collect
                minimal personal information necessary to provide our services.
              </li>
              <li>
                <strong>Sensitive Information:</strong> We do not process
                sensitive personal information.
              </li>
              <li>
                <strong>Third-Party Information:</strong> We do not receive any
                information from third parties.
              </li>
              <li>
                <strong>Information Processing:</strong> We process your
                information to provide and improve our services, communicate
                with you, and ensure security.
              </li>
              <li>
                <strong>Information Sharing:</strong> We only share information
                in specific situations and with specific third parties as
                detailed below.
              </li>
              <li>
                <strong>Information Security:</strong> We implement reasonable
                security measures to protect your information.
              </li>
            </ul>
          </section>

          {/* Continue with other sections... */}

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li>
                By email:{" "}
                <a
                  href="mailto:contact@bungeefitnessnear.me"
                  className="text-purple-600 hover:text-purple-700"
                >
                  contact@bungeefitnessnear.me
                </a>
              </li>
              <li>
                By visiting this page on our website:{" "}
                <a
                  href="/contact"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
