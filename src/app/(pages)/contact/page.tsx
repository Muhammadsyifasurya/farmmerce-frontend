"use client";
import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    if (formData.name && formData.email && formData.message) {
      setFormStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setFormStatus("Please fill in all fields.");
    }
  };

  return (
    <section className="mx-auto mt-[70px] min-h-screen max-w-5xl px-4 py-10 md:px-8">
      <h2 className="text-center text-4xl font-extrabold text-green-700">
        Contact Us
      </h2>
      <p className="mt-4 text-center text-lg text-gray-700">
        Have any questions? We&apos;d love to hear from you! Fill out the form
        below to get in touch with us.
      </p>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 w-full max-w-lg space-y-6"
      >
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Your email"
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label
            htmlFor="message"
            className="block text-lg font-semibold text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            rows={6}
            placeholder="Your message"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-800"
        >
          Send Message
        </button>

        {/* Form Status */}
        {formStatus && (
          <p className="mt-4 text-center text-lg font-semibold text-green-700">
            {formStatus}
          </p>
        )}
      </form>

      {/* Contact Information */}
      <div className="mt-10 text-center">
        <p className="text-lg text-gray-600">Or reach us at:</p>
        <div className="mt-4 space-y-2">
          <p className="text-lg text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@farmmerce.com"
              className="font-semibold text-green-700"
            >
              support@farmmerce.com
            </a>
          </p>
        </div>

        {/* WhatsApp Button */}
        <div className="mt-8">
          <p className="text-lg text-gray-600">
            Or chat with us directly on WhatsApp:
          </p>
          <a
            href="https://wa.me/6285158611725"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-800"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
