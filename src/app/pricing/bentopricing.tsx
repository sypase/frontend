import { FaDiscord, FaClock, FaCoins, FaInfinity, FaRobot, FaShieldCat, FaBolt } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function BentoDemo() {
  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-white to-gray-50">
      {/* Hero Stats Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-block">
          <span className="bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1 rounded-full border border-blue-100">
            Trusted by 50,000+ Students
          </span>
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-6 mt-4">
          Why Choose NoAIGPT?
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-12">
          The most advanced AI content humanizer, powered by GPT-4 technology
        </p>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="group flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="h-14 w-14 rounded-2xl bg-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaRobot className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">GPT-4 Powered</h3>
            <p className="text-gray-600">State-of-the-art AI for human-like content generation</p>
          </div>
          
          <div className="group flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="relative h-28 w-28 mb-6 group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/assets/MS-Startups-Celebration-Badge-Dark.png"
                alt="Microsoft for Startups Badge"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Microsoft Startup Partner</h3>
            <p className="text-gray-600">Backed by Microsoft's startup ecosystem</p>
          </div>
          
          <div className="group flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Most Cost-Effective</h3>
            <p className="text-gray-600">Premium features at unbeatable prices</p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Beat Turnitin Card */}
        <div className="md:col-span-2 group relative rounded-3xl bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 opacity-60" />
          <div className="relative p-12 h-full flex flex-col justify-between min-h-[45vh]">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="space-y-6">
                  <div className="inline-block mb-4">
                    <span className="bg-blue-50 text-blue-600 text-sm font-medium mr-2 px-4 py-1.5 rounded-full border border-blue-100">
                      <FaBolt className="inline-block mr-2" />
                      Instant Results
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    Beat Turnitin™
                    <br />Now
                  </h2>
                  <p className="text-xl text-gray-600 max-w-md leading-relaxed">
                    Transform your content instantly while maintaining originality. Our GPT-4 powered technology ensures undetectable results.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <RainbowButton 
                    className="px-8 py-3.5 text-lg font-medium whitespace-nowrap flex items-center justify-center"
                    onClick={() => {}}
                  >
                    Try For Free
                  </RainbowButton>
                  <button 
                    className="px-8 py-3.5 text-lg border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-300 font-medium whitespace-nowrap flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                    onClick={() => {}}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative w-full md:w-[45vh] h-[45vh] rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image
                  src="/assets/turnitin1.jpg"
                  alt="Turnitin"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ objectPosition: "25% 50%" }}
                  priority
                />
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-[40vh] h-[40vh] bg-blue-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute -left-20 -bottom-20 w-[40vh] h-[40vh] bg-purple-100 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Discord Card */}
        <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-[#5865F2] to-[#7289DA]">
          <div className="absolute inset-0 opacity-75 mix-blend-overlay bg-gradient-to-br from-transparent to-black/20" />
          <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[45vh]">
            <div className="absolute top-0 right-0 p-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">1,234 Online</span>
              </div>
            </div>
            <FaDiscord size={64} className="mb-8 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
            <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
              Connect with thousands of students. Get instant support 24/7.
            </p>
            <RainbowButton className="px-8 py-3 text-lg">
              Join Discord
            </RainbowButton>
          </div>
        </div>

        {/* Never Expire Card */}
        <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-emerald-400 to-emerald-600">
          <div className="absolute inset-0 opacity-75 mix-blend-overlay bg-gradient-to-br from-transparent to-black/20" />
          <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[45vh]">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
              <FaInfinity size={40} className="text-white" />
            </div>
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
        <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-violet-400 to-violet-600">
          <div className="absolute inset-0 opacity-75 mix-blend-overlay bg-gradient-to-br from-transparent to-black/20" />
          <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[45vh]">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
              <FaCoins size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Most Affordable Choice</h3>
            <p className="text-white/90 text-center mb-8 text-lg max-w-[80%] leading-relaxed">
              Top-up as you go with the most competitive rates in the market.
            </p>
            <RainbowButton className="px-8 py-3 text-lg">
              View Pricing
            </RainbowButton>
          </div>
        </div>

        {/* Save Time Card */}
        <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-amber-400 to-amber-600">
          <div className="absolute inset-0 opacity-75 mix-blend-overlay bg-gradient-to-br from-transparent to-black/20" />
          <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[45vh]">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
              <FaClock size={40} className="text-white" />
            </div>
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

export default BentoDemo;