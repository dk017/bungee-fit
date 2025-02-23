"use client";

import { useState } from "react";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

interface LeadCollectorProps {
  cityName: string;
  onClose: () => void;
}

export const LeadCollector = ({ cityName, onClose }: LeadCollectorProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "morning",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_FOR_LEAD_COLLECTION!,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          preferred_time: formData.preferredTime,
          city: cityName,
          type: "Lead Collection",
        }
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setTimeout(() => onClose(), 3000); // Close after 3 seconds on success
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative animate-slideIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎯 Try Bungee Fitness in {cityName}
          </h2>
          <p className="text-gray-600">
            Get a free consultation! We'll help you find the perfect studio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="block text-sm font-medium text-gray-700"
            >
              Best Time to Call
            </label>
            <select
              id="preferredTime"
              value={formData.preferredTime}
              onChange={(e) =>
                setFormData({ ...formData, preferredTime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 5PM)</option>
              <option value="evening">Evening (5PM - 8PM)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Get Free Consultation"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-600 text-sm text-center">
              Thanks! We'll call you back soon.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-red-600 text-sm text-center">
              Sorry, there was an error. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
