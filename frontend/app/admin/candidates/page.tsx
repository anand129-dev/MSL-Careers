"use client";

import React, { useState } from "react";
import { MapPin, Mail } from "lucide-react";
import { SectionSearch } from "../components/shared";

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const candidates = [
    {
      name: "Alice Freeman",
      role: "Full Stack Engineer",
      location: "London, UK",
      email: "alice@example.com",
    },
    {
      name: "Robert Fox",
      role: "Product Designer",
      location: "Remote",
      email: "robert@example.com",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <SectionSearch
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((c, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4"
          >
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl font-black text-indigo-600">
              {c.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{c.name}</h3>
              <p className="text-indigo-600 text-xs font-bold uppercase">
                {c.role}
              </p>
              <div className="mt-4 space-y-1 text-xs text-slate-500">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> {c.location}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {c.email}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs">
                  Profile
                </button>
                <button className="flex-1 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs">
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
