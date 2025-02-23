import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | BungeeFitnessNear.me",
  description:
    "Learn about how BungeeFitnessNear.me uses cookies and tracking technologies",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-purple max-w-none space-y-6">
          <section>
            <p className="text-gray-700">
              This Cookie Policy explains how BungeeFitnessNear.me uses cookies
              and similar technologies to recognize you when you visit our
              website. It explains what these technologies are and why we use
              them, as well as your rights to control our use of them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              What are cookies?
            </h2>
            <p className="text-gray-700">
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners to make their websites work, or to work more
              efficiently, as well as to provide reporting information.
            </p>
            <p className="text-gray-700 mt-4">
              Cookies set by the website owner (in this case,
              BungeeFitnessNear.me) are called "first-party cookies". Cookies
              set by parties other than the website owner are called
              "third-party cookies". Third-party cookies enable third-party
              features or functionality to be provided on or through the
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Why do we use cookies?
            </h2>
            <p className="text-gray-700">
              We use first-party and third-party cookies for several reasons.
              Some cookies are required for technical reasons necessary for our
              website to operate, and we refer to these as "essential" or
              "strictly necessary" cookies. Other cookies enable us to track and
              target the interests of our users to enhance the experience on our
              website.
            </p>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                The specific types of cookies served through our website and the
                purposes they perform:
              </h3>

              <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-900">
                    Essential Cookies
                  </h4>
                  <p className="text-gray-700">
                    These cookies are strictly necessary to provide you with
                    services available through our website and to use some of
                    its features.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-900">
                    Analytics Cookies
                  </h4>
                  <p className="text-gray-700">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-900">
                    Performance Cookies
                  </h4>
                  <p className="text-gray-700">
                    These cookies collect information about how visitors use our
                    website, helping us to improve how the website works.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How can you control cookies?
            </h2>
            <p className="text-gray-700">
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              your web browser. As the means by which you can refuse cookies
              through your web browser controls vary from browser to browser,
              you should visit your browser's help menu for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How often will we update this Cookie Policy?
            </h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect
              changes to the cookies we use or for other operational, legal, or
              regulatory reasons. Please therefore revisit this Cookie Policy
              regularly to stay informed about our use of cookies and related
              technologies.
            </p>
            <p className="text-gray-700 mt-4">
              The date at the top of this Cookie Policy indicates when it was
              last updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              More Information
            </h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies or other
              technologies, please contact us at:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:contact@bungeefitnessnear.me"
                  className="text-purple-600 hover:text-purple-700"
                >
                  contact@bungeefitnessnear.me
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Contact Form
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
