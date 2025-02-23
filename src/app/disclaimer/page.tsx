import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | BungeeFitnessNear.me",
  description: "Legal disclaimer and terms of use for BungeeFitnessNear.me",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>

        <div className="prose prose-purple max-w-none space-y-6">
          <section>
            <p className="text-gray-700">
              Welcome to BungeeFitnessNear.me. By accessing or using our
              website, you agree to comply with and be bound by the following
              disclaimer. Please read this disclaimer carefully before using the
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              General Information
            </h2>
            <p className="text-gray-700">
              The information provided on BungeeFitnessNear.me is for general
              informational purposes only. While we strive to keep the
              information up-to-date and accurate, we make no representations or
              warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability
              of the information, products, services, or related graphics
              contained on the website for any purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Studio Information
            </h2>
            <p className="text-gray-700">
              The studio information, including but not limited to class
              schedules, pricing, and amenities, is provided by the respective
              studios or collected from public sources. While we make every
              effort to ensure accuracy, this information may change without
              notice. We recommend contacting studios directly to confirm
              current offerings and prices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Health and Safety
            </h2>
            <p className="text-gray-700">
              Bungee fitness involves physical activity that may be strenuous
              and may cause injury. You should consult with a physician before
              starting any exercise program, including bungee fitness. By
              participating in bungee fitness activities, you agree that you do
              so at your own risk and are voluntarily participating in these
              activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Reviews and Testimonials
            </h2>
            <p className="text-gray-700">
              Reviews and testimonials displayed on our website are collected
              from various sources including social media platforms and user
              submissions. These represent individual experiences and are not
              guaranteed to be representative of results you may achieve. We do
              not verify the accuracy of user-submitted content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              External Links
            </h2>
            <p className="text-gray-700">
              Our website may contain links to external websites that are not
              provided or maintained by us. We do not guarantee the accuracy,
              relevance, timeliness, or completeness of any information on these
              external websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700">
              In no event shall BungeeFitnessNear.me be liable for any loss or
              damage including without limitation, indirect or consequential
              loss or damage, or any loss or damage whatsoever arising from loss
              of data or profits arising out of, or in connection with, the use
              of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Updates to Disclaimer
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify this disclaimer at any time without
              prior notice. By using our website, you agree to be bound by the
              current version of this disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700">
              If you have any questions about this disclaimer, please contact us
              at{" "}
              <a
                href="mailto:contact@bungeefitnessnear.me"
                className="text-purple-600 hover:text-purple-700"
              >
                contact@bungeefitnessnear.me
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
