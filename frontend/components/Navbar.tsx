"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../public/navora-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full //bg-gray-600 flex flex-col items-center mx-auto px-4 lg:px-20 xl:px-32 2xl:px-40">
      <div className="flex justify-between items-center lg:max-w-5xl 2xl:max-w-7xl w-full py-4">
        <div className="flex ext-2xl font-bold">
          <img src="/msl-logo.svg" alt="" />
          <img src="/navora-logo.png" alt="" width={100} />
        </div>
        <div className="ml-auto flex items-center gap-6">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-1"
          />
          <button className="hover:text-blue-600">Login</button>
          <button className="hover:text-blue-600">Language</button>
          <button className="hover:text-blue-600">Contact</button>
        </div>
      </div>
    </header>
    // <header className=" w-full max-w-5xl px-4 bg-green-400  lg:px-8 lg:bg-red-400 xl:px-20 xl:bg-yellow-300  2xl:px-28 2xl:bg-blue-400  py-4">
    //   {/* Top Row */}
    //   <div className="flex items-center justify-between">
    //     {/* Logo */}
    //     <div className="text-2xl font-bold">Logo</div>

    //     {/* Right section (hidden below lg) */}
    //     <div className="hidden lg:flex items-center gap-6">
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         className="border rounded-md px-3 py-1"
    //       />
    //       <button className="hover:text-blue-600">Login</button>
    //       <button className="hover:text-blue-600">Language</button>
    //       <button className="hover:text-blue-600">Contact</button>
    //     </div>

    //     {/* Hamburger (visible below lg) */}
    //     <button className="lg:hidden" onClick={() => setOpen(!open)}>
    //       {open ? <X size={28} /> : <Menu size={28} />}
    //     </button>
    //   </div>

    //   {/* Below lg → collapsible menu */}
    //   {open && (
    //     <div className="mt-4 lg:hidden space-y-4 pb-4">
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         className="border w-full rounded-md px-3 py-1"
    //       />

    //       <div className="flex flex-col gap-3">
    //         <button className="text-left">Login</button>
    //         <button className="text-left">Language</button>
    //         <button className="text-left">Contact</button>
    //       </div>

    //       <div className="pt-3 border-t">
    //         <nav className="flex flex-col gap-3">
    //           <a href="#" className="hover:text-blue-600">
    //             Home
    //           </a>
    //           <a href="#" className="hover:text-blue-600">
    //             Jobs
    //           </a>
    //           <a href="#" className="hover:text-blue-600">
    //             Departments
    //           </a>
    //           <a href="#" className="hover:text-blue-600">
    //             About
    //           </a>
    //         </nav>
    //       </div>
    //     </div>
    //   )}

    //   {/* Bottom Row – Navbar items (visible from lg) */}
    //   <nav className="hidden lg:flex gap-10 mt-4">
    //     <a href="#" className="hover:text-blue-600">
    //       Home
    //     </a>
    //     <a href="#" className="hover:text-blue-600">
    //       Jobs
    //     </a>
    //     <a href="#" className="hover:text-blue-600">
    //       Departments
    //     </a>
    //     <a href="#" className="hover:text-blue-600">
    //       About
    //     </a>
    //   </nav>
    // </header>
  );
}
