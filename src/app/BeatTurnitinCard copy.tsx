import { FaDiscord } from "react-icons/fa";
import Image from "next/image";

export function BentoDemo() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {/* Beat Turnitin Card */}
        <div className="md:col-span-2 relative group rounded-3xl bg-white border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          
          {/* Content Container */}
          <div className="relative p-12 h-full flex flex-col justify-between min-h-[45vh]">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-[6vh] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    Beat Turnitin Now
                  </h2>
                  <p className="text-[2.2vh] text-gray-600 max-w-md leading-relaxed">
                    Transform your content seamlessly while maintaining originality 
                    and bypassing Turnitin detection with our advanced AI technology.
                  </p>
                </div>
                
                {/* Enhanced Button */}
                <button className="group relative inline-flex items-center justify-center px-[4vh] py-[2vh] rounded-full overflow-hidden bg-black transition-all duration-300">
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:w-full group-hover:transition-all duration-1000" />
                  
                  {/* Button text */}
                  <span className="relative text-[2vh] font-medium text-white">
                    Try NoAIGPT For Free Now
                  </span>
                </button>
              </div>

              {/* Enhanced Image Container */}
              <div className="relative w-[45vh] h-[45vh] rounded-2xl overflow-hidden shadow-2xl group/image">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 z-10 group-hover/image:opacity-0 transition-opacity duration-300" />
                <Image
                  src="/assets/turnitin1.jpg"
                  alt="Turnitin"
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  style={{ 
                    objectPosition: '25% 50%',
                    transform: 'scale(1.1)'
                  }}
                  priority
                />
              </div>
            </div>

            {/* Enhanced Decorative Elements */}
            <div className="absolute -right-20 -top-20 w-[40vh] h-[40vh] bg-blue-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute -left-20 -bottom-20 w-[40vh] h-[40vh] bg-purple-200 rounded-full blur-3xl opacity-20" />
          </div>
        </div>

        {/* Discord Card */}
        <div className="relative group rounded-3xl bg-[#5865F2] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] to-[#7289DA] opacity-80" />
          <div className="relative p-10 h-full flex flex-col items-center justify-center text-white min-h-[45vh]">
            <FaDiscord className="w-[10vh] h-[10vh] mb-[3vh] animate-pulse" />
            <h3 className="text-[3vh] font-bold mb-[2vh]">Join Our Community</h3>
            <p className="text-white/90 text-center mb-[3vh] text-[2vh] max-w-[80%] leading-relaxed">
              Connect with thousands of students on Discord
            </p>
            {/* Enhanced Discord Button */}
            <button className="group relative inline-flex items-center justify-center px-[4vh] py-[1.5vh] rounded-full overflow-hidden bg-white transition-all duration-300 hover:scale-105">
              {/* Shine effect */}
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#5865F2]/0 via-[#5865F2]/10 to-[#5865F2]/0 transform -skew-x-12 group-hover:w-full group-hover:transition-all duration-1000" />
              
              {/* Button text */}
              <span className="relative text-[2vh] font-medium text-[#5865F2]">
                Join Discord
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}