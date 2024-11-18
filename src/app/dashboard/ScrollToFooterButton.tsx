import { useState, useEffect, useRef } from "react";

const ScrollToFooterButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Track if it's mobile screen

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your breakpoints
    };

    const handleScroll = () => {
      if (footerRef.current) {
        const footerPosition = footerRef.current.offsetTop;
        const distanceFromFooter = footerPosition - window.scrollY;

        // Show button when user is a certain distance from footer
        if (distanceFromFooter < window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Initialize visibility based on resize
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToFooter = () => {
    if (footerRef.current) {
      window.scrollTo({
        top: footerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Button only visible on mobile and when conditions are met
  return (
    isMobile && isVisible && (
      <button
        onClick={scrollToFooter}
        className="fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity"
      >
        Scroll to Footer
      </button>
    )
  );
};

export default ScrollToFooterButton;
