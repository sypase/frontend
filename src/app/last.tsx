import React, { useEffect } from "react";
import gsap from "gsap";

const ElegantFooter = () => {
    useEffect(() => {
        gsap.fromTo(
            ".footer-item",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
        );
    }, []);

    const footerNavs = [
        {
            label: "Explore",
            items: [
                { name: "Blog", href: "/blog" },
                { name: "Bypasser Benchmark", href: "/ai-bypassers" },
                { name: "Pricing", href: "/pricing" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "Earn", href: "/earn" },
                { name: "LinkedIn", href: "https://www.linkedin.com/company/noaigpt/" },
                { name: "Instagram", href: "https://www.instagram.com/noaigptcom/" }
            ]
        },
        {
            label: "Contact & Payment",
            items: [
                { name: "Payment via IME Pay ↗", href: "https://imepay.com.np" },
                { name: "Harisiddhi, Nepal", href: "#" },
                { name: "Reg no 184477 393/29 GHA", href: "#" },
                { name: "PAN 621693940", href: "#" },
                { name: "Under No A I G P T", href: "#" }
            ]
        },
        {
            label: "Legal",
            items: [
                { name: "Terms & Conditions", href: "/assets/terms-of-service.txt" },
                { name: "Privacy Policy", href: "/assets/Privacy%20Policy%20for%20NoaiGPT%20-%20TermsFeed.pdf" },
                { name: "Refund Policy", href: "/assets/Return%20and%20Refund%20Policy%20for%20NoaiGPT%20-%20PrivacyPolicies.com.pdf" }
            ]
        }
    ];

    return (
        <footer className="relative bg-black text-gray-200 py-12 w-full font-sans overflow-hidden"> {/* Dark background for the footer */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="footer-item mb-8 md:mb-0 md:w-1/3">
                        <h1 className="text-3xl font-bold mb-4">NoaiGPT</h1>
                        <p className="text-lg font-medium">
                            Bypass all detectors with no plagiarism
                        </p>
                        <p className="mt-2">contact@noaigpt.com</p>
                        <p className="mt-2">© NoaiGPT 2024.</p>
                    </div>

                    <div className="md:w-2/3 flex flex-wrap justify-end">
                        {footerNavs.map((section, idx) => (
                            <div key={idx} className="footer-item w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
                                <h3 className="text-xl font-semibold mb-4">{section.label}</h3>
                                <ul>
                                    {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="mb-2">
                                            <a
                                                href={item.href}
                                                className="hover:text-gray-400 transition duration-300 ease-in-out" // Lighter color on hover
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ElegantFooter;
