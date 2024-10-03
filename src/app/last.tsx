import React, { useEffect } from "react";
import gsap from "gsap";

const ElegantFooter = () => {
  useEffect(() => {
    // GSAP animations for the footer
    gsap.fromTo(
      ".footer-link",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <footer className="bg-white/30 backdrop-blur-md text-gray-900 py-8 w-full font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Links Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Explore</h3>
            <ul>
              <li className="footer-link mb-2">
                <a
                  href="/blog"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Visit our Blog ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/bypasser-benchmark"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Bypasser Benchmark ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/pricing"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Pricing ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/dashboard"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Dashboard ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/earn"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Earn ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/linkedin"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  href="/instagram"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col justify-center items-center mb-4 md:mb-0">
            <img src="/assets/logo.svg" alt="NOAIGPT Logo" className="h-16" />
            <p className="mt-4 text-lg font-medium text-center">
              Bypass all detectors with no plagiarism
            </p>
            <p>contact@noaigpt.com</p>
          </div>

          {/* Payment and Location Section */}
          <div className="mb-4 md:mb-0 text-right">
            <h3 className="text-xl font-semibold mb-2">Contact & Payment</h3>
            <ul>
              <li className="footer-link mb-2">
                <img
                  src="/assets/imepay.png"
                  alt="IME Pay Logo"
                  className="h-8 inline-block mr-2"
                />
                <a
                  href="https://imepay.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                >
                  Payment via IME Pay ↗
                </a>
              </li>
              <li className="footer-link mb-2">Harisiddhi, Nepal</li>
              <li className="footer-link mb-2">
                <a className="hover:text-gray-600 transition duration-300 ease-in-out">
                  Reg no 184477 393/29 GHA{" "}
                </a>
              </li>
              <li className="footer-link mb-2">
                <a className="hover:text-gray-600 transition duration-300 ease-in-out">
                  PAN 621693940{" "}
                </a>
              </li>
              <li className="footer-link mb-2">
                <a className="hover:text-gray-600 transition duration-300 ease-in-out">
                  Under No A I G P T{" "}
                </a>
              </li>
              <li className="footer-link mb-2">
                <a className="hover:text-gray-600 transition duration-300 ease-in-out"
                href="/assets/terms-of-service.txt"
                >
                  Terms & Condition ↗{" "}
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                  href="/assets/Privacy%20Policy%20for%20NoaiGPT%20-%20TermsFeed.pdf"
                >
                  Privacy Policy ↗{" "}
                </a>
              </li>
              <li className="footer-link mb-2">
                <a
                  className="hover:text-gray-600 transition duration-300 ease-in-out"
                  href="/assets/Return%20and%20Refund%20Policy%20for%20NoaiGPT%20-%20PrivacyPolicies.com.pdf"
                >
                  Refund Policy ↗{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-8 text-center text-xl font-bold font-serif">
          © NOAIGPT 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ElegantFooter;
