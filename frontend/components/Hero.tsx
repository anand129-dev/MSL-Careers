import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

// Define the component props, all are optional
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  button1Text?: string;
  button1Href?: string;
  button2Text?: string;
  button2Href?: string;
  backgroundImageUrl?: string; // Optional: Allow overriding the background image
}

// 1. Default Background Image URL
// NOTE: Ensure you have an image file named 'maritime-background.jpg'
// in your /public directory for this default path to work.
const DEFAULT_BACKGROUND_IMAGE_URL = "/hero-background.jpg";

// 2. Component renamed to HeroSection
const HeroSection: FC<HeroSectionProps> = ({
  // --- Default Content Values ---
  title = "NAVORA Careers Portal",
  subtitle = "Search and apply for Maritime jobs, Shipping jobs and Energy jobs.",
  description = "Our listings are updated regularly to help you find the right opportunity. Can’t find what you’re looking for? Sign up for job alerts — simply create an account or log in to stay notified about new openings that match your interests.",
  button1Text = "Explore Jobs",
  button1Href = "/jobs",
  backgroundImageUrl = DEFAULT_BACKGROUND_IMAGE_URL, // Default image path
  button2Text = "Upload CV",
  button2Href = "/user/cv",
  // ------------------------------
}) => {
  return (
    // Hero Section: Full viewport height/width, relative for the image/overlay
    <section className="relative w-full flex items-center justify-start text-white overflow-hidden pt-28">
      {/* 1. Background Image (Next.js Image for optimization) */}
      <Image
        src={backgroundImageUrl}
        alt="A large container ship at sea, symbolizing maritime careers"
        layout="fill"
        objectFit="cover"
        priority={true} // Load the hero image early
        quality={100}
        className="z-0"
      />

      {/* 2. Dark Overlay for Text Readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white z-10"></div> */}
      <div className="absolute top-28 inset-x-0 h-[calc(100%-7rem)] bg-gradient-to-b from-white to-transparent z-10"></div>

      <div className="w-full max-w-7xl mx-auto //bg-red-500 relative z-10 pt-28 pb-36">
        <div className="//bg-green-500 mx-4 flex justify-between">
          {/* Left Content */}
          <div className="//bg-blue-600 max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-4 text-black ">
              {title}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-light text-secondary tracking-tighter mb-6">
              {subtitle}
            </h2>
            <p className="text-lg sm:text-xl font-normal text-white mb-8">
              {description}
            </p>
            <div className="flex gap-4">
              <Link
                rel="stylesheet"
                href="{button1Href}"
                className="font-medium px-4 py-2 md:px-6 md:py-2 md:text-lg bg-secondary  text-white rounded-full hover:bg-blue-700 shadow-lg transition duration-150 ease-in-out"
              >
                {" "}
                {button1Text}{" "}
              </Link>
              <Link
                rel="stylesheet"
                href="{button2Href}"
                className="font-medium px-4 py-2 md:px-6 md:py-2 md:text-lg bg-white border border-secondary text-secondary rounded-full hover:bg-secondary shadow-lg transition duration-150 ease-in-out"
              >
                {" "}
                {button2Text}{" "}
              </Link>
            </div>
          </div>
          {/* Right Content */}
          {/* <div>
            <Image
              src="/navora.png"
              alt="Navora Maritime Solutions"
              width={120} // set your desired width
              height={60} // set your desired height
              priority // optional, for preloading
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
