
import { FaDiscord } from "react-icons/fa6";
import { FaClock, FaCoins, FaInfinity } from "react-icons/fa6";
import Image from "next/image";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from 'next/link';

interface BentoDemoProps {
  onShowSignupForm: () => void;
}

export function BentoDemo({ onShowSignupForm }: BentoDemoProps) {
  return (
    <>

      <div className="container mx-auto p-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Beat Turnitin Card */}
          <section className="md:col-span-2 relative group rounded-3xl bg-neutral-800 border border-neutral-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 to-purple-800/80" />
            <div className="relative p-10 h-full flex flex-col justify-between min-h-[40vh]">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight text-center md:text-left">
                      Beat Turnitin Now
                    </h2>
                    <p className="text-xl text-gray-300 max-w-md leading-relaxed text-center md:text-left">
                      Transform your content seamlessly while maintaining originality and bypassing Turnitin detection with our advanced AI technology.
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start">

                      <RainbowButton className="px-8 py-3 text-lg" onClick={onShowSignupForm}>
                        Try NoaiGPT For Free Now
                      </RainbowButton>
                  </div>
                </div>
                <div className="relative w-[40vh] h-[40vh] rounded-2xl overflow-hidden shadow-xl group/image">
                  <Image
                    src="/assets/Bypass Photos/turnitin1.jpg"
                    alt="Turnitin Bypass"
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-110"
                    style={{ objectPosition: "25% 50%" }}
                    priority
                  />
                </div>
              </div>
              <div className="absolute -right-20 -top-20 w-[40vh] h-[40vh] bg-blue-100 rounded-full blur-3xl opacity-20" />
              <div className="absolute -left-20 -bottom-20 w-[40vh] h-[40vh] bg-purple-100 rounded-full blur-3xl opacity-20" />
            </div>
          </section>

          {/* Other Cards */}
          {
  [
    {
      bg: "bg-[#5865F2]",
      title: "Join Our Community",
      description: "Connect with thousands of students on Discord",
      icon: <FaDiscord size={64} className="mb-6 animate-pulse" />,
      buttonText: "Join Discord",
      link: "https://discord.gg/PzsY72DC", // Discord link
    },
    {
      bg: "bg-emerald-500",
      title: "Words Never Expire",
      description: "Your purchased words stay valid forever. No time limits, no pressure.",
      icon: <FaInfinity size={64} className="mb-6" />,
      buttonText: "Learn More",
      link: "/info", // Link to /info page
    },
    {
      bg: "bg-violet-500",
      title: "Pay For What You Use",
      description: "Flexible pricing based on your needs. Check our pricing page for details.",
      icon: <FaCoins size={64} className="mb-6" />,
      buttonText: "View Pricing",
      link: "/pricing", // Link to /pricing page
    },
    {
      bg: "bg-amber-500",
      title: "Save Your Time",
      description: "Transform your content in seconds, not hours. Fast, efficient, and reliable.",
      icon: <FaClock size={64} className="mb-6" />,
      buttonText: "Start Now",
      link: "", // Link to start page
    },
  ].map((card, index) => (
    <section
      key={index}
      className={`relative group rounded-3xl ${card.bg} overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${card.bg}/90 to-${card.bg}-600/90`} />
      <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[40vh] text-center">
        {card.icon}
        <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
        <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
          {card.description}
        </p>
        {card.link.startsWith("http") ? (
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            <RainbowButton className="px-8 py-3 text-lg">{card.buttonText}</RainbowButton>
          </a>
        ) : card.buttonText === "Start Now" ? (
          <RainbowButton className="px-8 py-3 text-lg" onClick={onShowSignupForm}>
            {card.buttonText}
          </RainbowButton>
        ) : (
          <Link href={card.link}>
            <RainbowButton className="px-8 py-3 text-lg">{card.buttonText}</RainbowButton>
          </Link>
        )}
      </div>
    </section>
  ))
}

        </div>
      </div>
    </>
  );
}
