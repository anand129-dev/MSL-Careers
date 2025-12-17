"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-phone-number-input/style.css";

// Dynamic import for PhoneInput to prevent SSR hydration errors
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

export default function SendEmailForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousEmployment, setPreviousEmployment] = useState("");
  const [phone, setPhone] = useState("");
  const imageUrl = "/hero-background.jpg";

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setStatus("");

  // const formData = new FormData(e.currentTarget);

  // try {
  //     const res = await fetch("http://localhost:3333/send-email", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     setStatus(data.message || "Email sent successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Something went wrong.");
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget; // IMPORTANT
    const formData = new FormData(form);

    // Debug: confirm FormData has entries
    for (const pair of formData.entries()) {
      console.log("PAIR:", pair[0], pair[1]);
    }

    const data = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        data[key] = {
          name: value.name,
          size: value.size,
          type: value.type,
        };
      } else {
        data[key] = value;
      }
    }

    console.log("FINAL FORM OBJECT 👇");
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] overflow-hidden hidden md:block">
        <img
          src={imageUrl}
          alt="A beautiful landscape hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-1"></div>
      </div>

      <main className="absolute  bg-white top-24 md:top-56 inset-x-0 mx-auto w-full md:max-w-4xl lg:max-w-5xl xl:max-w-7xl md:shadow-2xl px-4 sm:px-6 lg:px-8 py-10">
        <div>
          <span className="font-semibold text-gray-700">jobs/id</span>
        </div>
        <div className="text-blue-500 font-semibold text-xl my-2">
          <span className="font-medium text-gray-700">
            You are applying for -{" "}
          </span>
          User Experience Designer (R162647)
        </div>
        <div className="w-full h-[2px] bg-blue-500 my-4"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              Full Name<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="fullName"
              required
              defaultValue=""
              placeholder="Enter your full name"
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              Email Address<span className="text-red-500">*</span>
            </p>
            <input
              type="email"
              name="email"
              required
              defaultValue=""
              placeholder="you@example.com"
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              Phone Number<span className="text-red-500">*</span>
            </p>
            <div className="w-full md:w-2/3">
              <PhoneInput
                international
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                className="PhoneInput border border-gray-300 rounded-md px-4 py-2 w-full"
              />
              <input type="hidden" name="phone" value={phone || ""} />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              Upload Your Resume<span className="text-red-500">*</span>
            </p>
            <div className="w-full md:w-2/3 flex flex-col gap-1">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:border-gray-400
                           file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md
                           file:cursor-pointer hover:file:bg-blue-700 w-full"
              />
              <p className="text-gray-400 text-sm">
                Accepted formats: PDF, DOC, DOCX. Max size: 5MB
              </p>
            </div>
          </div>

          {/* Source Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              How Did You Hear About Us?
            </p>
            <select
              name="source"
              required
              defaultValue=""
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-white
                         focus:outline-none focus:ring-0 focus:border-gray-400"
            >
              <option value="" disabled hidden>
                Please select
              </option>
              <option value="linkedin">LinkedIn</option>
              <option value="company-website">Company Website</option>
              <option value="referral">Employee Referral</option>
              <option value="job-portal">Job Portal</option>
              <option value="social-media">Social Media</option>
              <option value="recruiter">Recruiter</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Previous Employment */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
            <p className="w-full md:w-1/3 text-gray-500 font-light text-left md:text-right">
              Have you been employed through Navora in the past?
              <span className="text-red-500">*</span>
            </p>
            <div className="w-full md:w-2/3 flex flex-col gap-2">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="previousEmployment"
                    value="yes"
                    className="accent-blue-600"
                    checked={previousEmployment === "yes"}
                    onChange={() => setPreviousEmployment("yes")}
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="previousEmployment"
                    value="no"
                    className="accent-blue-600"
                    checked={previousEmployment === "no"}
                    onChange={() => setPreviousEmployment("no")}
                  />
                  No
                </label>
              </div>
              {previousEmployment === "yes" && (
                <input
                  type="text"
                  name="previousDetails"
                  placeholder="Please specify your previous role or period"
                  className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 mt-2"
                  required
                />
              )}
            </div>
          </div>

          {/* Consent */}
          <div className="flex flex-col gap-2 mt-6">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 accent-blue-600 w-4 h-4"
              />
              <span className="text-gray-600 text-sm">
                I agree to receive recruitment-related communications from
                Navora, operated by MaritimeSolutionsLtd. I understand that my
                personal information will be processed in accordance with the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Recruitment and Applicant Privacy Policy
                </a>
                , and I may opt out at any time.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              {loading ? "Sending..." : "Submit Application"}
            </button>
          </div>

          {/* Status */}
          {status && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {status}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
