'use client';

import React from 'react';
import { User, Lock, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><User className="w-6 h-6" /></div>
          <div>
            <h3 className="font-bold">Profile Information</h3>
            <p className="text-xs text-slate-400">Update your public credentials.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" defaultValue="Admin" />
          <input type="text" placeholder="Last Name" className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" defaultValue="User" />
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm">Save Changes</button>
      </div>
    </div>
  );
}
