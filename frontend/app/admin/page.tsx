"use client";

import React, { useState } from "react";
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";
import { StatusBadge, SectionSearch } from "./components/shared";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      label: "Total Jobs",
      value: "142",
      change: "+12%",
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      label: "Total Candidates",
      value: "3,842",
      change: "+24%",
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Applications",
      value: "1,234",
      change: "+8%",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      label: "Active Jobs",
      value: "89",
      change: "-3%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentApplications = [
    { name: "John Doe", job: "Senior Developer", status: "Pending" },
    { name: "Jane Smith", job: "UI/UX Designer", status: "Reviewed" },
    { name: "Mike Johnson", job: "Product Manager", status: "Interview" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex justify-between"
          >
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-slate-800 mt-1">
                {stat.value}
              </p>
              <span className="text-xs font-bold text-green-600">
                {stat.change}
              </span>
            </div>
            <div
              className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}
            >
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold">Recent Applications</h2>
          <SectionSearch
            placeholder="Search applications..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-slate-100">
            {recentApplications.map((app, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-sm">{app.name}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{app.job}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
