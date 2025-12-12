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
  title = "Set Sail on a Career That Matters",
  subtitle = "Join Maritime Solutions Ltd. — where innovation meets the sea",
  description = "At Maritime Solutions Ltd., we believe that the horizon is just the beginning. Whether you’re passionate about ship operations, maritime technology, or logistics, here you’ll work on meaningful projects that power global commerce. With us, your career won’t just navigate the waves — it will chart new courses.",
  button1Text = "Explore Jobs",
  button1Href = "/jobs",
  backgroundImageUrl = DEFAULT_BACKGROUND_IMAGE_URL, // Default image path
  button2Text = "Upload CV",
  button2Href = "/user/cv",
  // ------------------------------
}) => {
  return (
    // Hero Section: Full viewport height/width, relative for the image/overlay
    <section className="relative z-20 h-[70vh] w-full flex items-center justify-start text-white overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white z-10"></div>

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
            href={button1Href}
            className="text-base font-medium px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary md:py-3 md:text-lg md:px-6 shadow-lg transition duration-150 ease-in-out mr-8"
          >
            {/* The button text becomes the child of the Link component */}
            {button1Text}
          </Link>
          <Link
            href={button2Href}
            className="text-base font-medium px-4 py-2 bg-transparent border border-primary text-white rounded-full hover:bg-secondary md:py-3 md:text-lg md:px-6 shadow-lg transition duration-150 ease-in-out"
          >
            {/* The button text becomes the child of the Link component */}
            {button2Text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
