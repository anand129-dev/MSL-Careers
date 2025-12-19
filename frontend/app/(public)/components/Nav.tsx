"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuItems = ["Home", "Services", "About", "Contact"];

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 //border-b border-b-[#CEA72B] border-t-4 border-t-[#CEA72B] h-28">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-[#24439C] font-[Tinos] text-xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/msllogo1.png" alt="MSL Logo" height={90} width={90} />
          <p>Maritime Solutions Ltd</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-col items-end h-full justify-between">
          {/* Top Buttons */}
          <ul className="flex items-center gap-px  text-white text-xs font-medium mb-1 border-t border-white">
            <li className="bg-[#CEA72B] px-2 py-1 rounded-bl-md cursor-pointer hover:bg-[#24439C]">
              Upload CV
            </li>
            <li className="bg-[#CEA72B] px-4 py-1 cursor-pointer hover:bg-[#24439C]">
              <button onClick={() => router.push("/register")}>
                Register a vacancy
              </button>
            </li>
            <li className="bg-[#CEA72B] px-4 py-1 rounded-br-md cursor-pointer hover:bg-[#24439C]">
              <button onClick={() => router.push("/login")}>Login</button>
            </li>
          </ul>

          {/* Bottom Nav + Search */}
          <div className="flex items-center gap-8 mb-auto mt-4">
            <ul className="hidden md:flex items-center gap-8 text-[#24439C] font-medium">
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
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
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
      <div
        className={`${
          open ? "block" : "hidden"
        } md:hidden px-6 pb-4 bg-white border-t border-gray-200 shadow-sm`}
        id="mobileMenu"
      >
        <ul className="flex flex-col gap-3 text-gray-700 font-medium py-2">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block py-2 px-2 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
