import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

// Define the component props, all are optional
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImageUrl?: string; // Optional: Allow overriding the background image
}

// 1. Default Background Image URL
// NOTE: Ensure you have an image file named 'maritime-background.jpg'
// in your /public directory for this default path to work.
const DEFAULT_BACKGROUND_IMAGE_URL = "/hero-background.jpg";

// 2. Component renamed to HeroSection
const HeroSection: FC<HeroSectionProps> = ({
  // --- Default Content Values ---
  title = "Navigate Your Future",
  subtitle = "Discover Rewarding Maritime Careers",
  description = "Explore exciting opportunities in shipping, logistics, and naval architecture. Join a global industry that moves the world forward.",
  buttonText = "Explore Careers Now",
  buttonHref = "/careers",
  backgroundImageUrl = DEFAULT_BACKGROUND_IMAGE_URL, // Default image path
  // ------------------------------
}) => {
  return (
    // Hero Section: Full viewport height/width, relative for the image/overlay
    <section className="relative z-20 h-[80vh] w-full flex items-center justify-start text-white overflow-hidden">
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
      {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-70 z-10"></div> */}

      {/* 3. Content Container (Left-aligned) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left py-16">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-light text-blue-300 mb-6">
            {subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-blue-100 mb-8">{description}</p>

          {/* Button (Link) */}
          {/* Button (Link) - MODERN APPROACH */}
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg transition duration-150 ease-in-out"
          >
            {/* The button text becomes the child of the Link component */}
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
