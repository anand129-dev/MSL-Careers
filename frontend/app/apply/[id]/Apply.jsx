"use client";

import { useState } from "react";

export default function SendEmailForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:3333/send-email", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStatus(data.message || "Email sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">
        Submit your resume and cover letter
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Recipient Email"
          required
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          name="message"
          placeholder="Your message"
          required
          className="w-full border rounded px-4 py-2"
          rows={4}
        />

        <label className="font-semibold block mb-1">Attach PDF:</label>
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          required
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-green-600 font-medium">{status}</p>
      )}
    </div>
  );
}
