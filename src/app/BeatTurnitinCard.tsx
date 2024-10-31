import { FaDiscord } from "react-icons/fa6";
import { FaClock, FaCoins, FaInfinity } from "react-icons/fa6";
import Image from "next/image";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function BentoDemo() {
  return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Beat Turnitin Card */}
          <div className="md:col-span-2 relative group rounded-3xl bg-neutral-800 border border-neutral-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 to-purple-800/80" />
            <div className="relative p-10 h-full flex flex-col justify-between min-h-[40vh]">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                      Beat Turnitin Now
                    </h2>
                    <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                      Transform your content seamlessly while maintaining originality and bypassing Turnitin detection with our advanced AI technology.
                    </p>
                  </div>
                  <RainbowButton className="px-8 py-3 text-lg">
                    Try NoAIGPT For Free Now
                  </RainbowButton>
                </div>
                <div className="relative w-[40vh] h-[40vh] rounded-2xl overflow-hidden shadow-xl group/image">
                  <Image
                    src="/assets/turnitin1.jpg"
                    alt="Turnitin"
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
          </div>

          {/* Discord Card */}
          <div className="relative group rounded-3xl bg-[#5865F2] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/90 to-[#7289DA]/90" />
            <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[40vh]">
              <FaDiscord size={64} className="mb-6 animate-pulse" />
              <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
              <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
                Connect with thousands of students on Discord
              </p>
              <RainbowButton className="px-8 py-3 text-lg">
                Join Discord
              </RainbowButton>
            </div>
          </div>

          {/* Never Expire Card */}
          <div className="relative group rounded-3xl bg-emerald-500 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/90 to-emerald-600/90" />
            <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[40vh]">
              <FaInfinity size={64} className="mb-6" />
              <h3 className="text-3xl font-bold mb-4">Words Never Expire</h3>
              <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
                Your purchased words stay valid forever. No time limits, no pressure.
              </p>
              <RainbowButton className="px-8 py-3 text-lg">
                Learn More
              </RainbowButton>
            </div>
          </div>

          {/* Pay Per Use Card */}
          <div className="relative group rounded-3xl bg-violet-500 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/90 to-violet-600/90" />
            <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[40vh]">
              <FaCoins size={64} className="mb-6" />
              <h3 className="text-3xl font-bold mb-4">Pay For What You Use</h3>
              <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
                Flexible pricing based on your needs. Check our pricing page for details.
              </p>
              <RainbowButton className="px-8 py-3 text-lg">
                View Pricing
              </RainbowButton>
            </div>
          </div>

          {/* Save Time Card */}
          <div className="relative group rounded-3xl bg-amber-500 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/90 to-amber-600/90" />
            <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[40vh]">
              <FaClock size={64} className="mb-6" />
              <h3 className="text-3xl font-bold mb-4">Save Your Time</h3>
              <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
                Transform your content in seconds, not hours. Fast, efficient, and reliable.
              </p>
              <RainbowButton className="px-8 py-3 text-lg">
                Start Now
              </RainbowButton>
            </div>
          </div>
        </div>
      </div>
  );
}
