// components/HeroSection.jsx
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Main Content Area */}
      <div className="relative w-full container mx-auto flex items-center justify-end h-[600px] sm:h-[650px] md:h-[700px] p-4 sm:p-8">
        {/* Right Content Card */}
        <div className="bg-yellow-50 rounded-lg max-w-md w-full relative z-10 flex flex-col justify-center shadow-lg">
          <div className="p-6 sm:p-9">
            {/* New Arrival */}
            <p className="font-poppins font-semibold text-[14px] sm:text-[16px] leading-[100%] tracking-[3px]">
              New Arrival
            </p>

            {/* Heading */}
            <h1 className="font-poppins font-bold text-[32px] sm:text-[52px] leading-[40px] sm:leading-[65px] tracking-[0px] text-[#B88E2F] mt-2">
              Discover Our New Collection
            </h1>
            {/* Description */}
            <p className="font-poppins font-medium text-[14px] sm:text-[18px] leading-[20px] sm:leading-[24px] tracking-[0px] mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            {/* Button */}
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-poppins font-bold text-[14px] sm:text-[16px] leading-[100%] tracking-[0px] uppercase py-3 sm:py-5 px-4 sm:px-6 rounded-md transition duration-300 ease-in-out self-start mt-5">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
