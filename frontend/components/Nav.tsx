"use client";

import React from "react";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="bg-transparent border-b border-b-[#CEA72B] border-t-4 border-t-[#CEA72B] h-28">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 text-[#24439C] font-[Tinos] text-xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/MSL Logo without name.svg"
            alt="MSL Logo"
            width={70}
            height={70}
            priority
          />
          <p>Maritime Solutions Ltd</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-col items-end h-full justify-between">
          {/* Top Buttons */}
          <ul className="flex items-center gap-[0.5px] text-white text-xs font-medium mb-1 border-t border-white">
            <li className="bg-[#CEA72B] px-2 py-px rounded-bl-md cursor-pointer hover:bg-[#24439C]">
              Upload CV
            </li>
            <li className="bg-[#CEA72B] px-4 py-px cursor-pointer hover:bg-[#24439C]">
              <button onClick={() => router.push("/create-job")}>
                Register a vacancy
              </button>
            </li>
            <li className="bg-[#CEA72B] px-4 py-px rounded-br-md cursor-pointer hover:bg-[#24439C]">
              <button onClick={() => router.push("/login")}>Login</button>
            </li>
          </ul>

          {/* Bottom Nav + Search */}
          <div className="flex items-center gap-8 mt-auto">
            <input
              type="text"
              placeholder="Search Jobs"
              className="border px-3 py-1 rounded-md"
            />

            <ul className="flex items-center gap-8 text-[#24439C] font-medium">
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Employers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Executive Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Sectors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#CEA72B]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none">
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden hidden px-6 pb-4" id="mobileMenu">
        <ul className="flex flex-col gap-4 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
