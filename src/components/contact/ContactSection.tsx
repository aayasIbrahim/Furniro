"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("⚠️ " + (data.error || "Failed to send message"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Something went wrong while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-semibold text-[36px] leading-[100%] tracking-[0%]">
            Get In Touch With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mt-5">
            For More Information About Our Product & Services, please feel free
            to drop us an email. Our staff will always be there to help you out.
            Do not hesitate!
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mt-5">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Address
                </h3>
                <p className="text-gray-600 text-base">
                  238 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-600 text-base">Mobile: +(84) 546-6789</p>
                <p className="text-gray-600 text-base">
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Working Time
                </h3>
                <p className="text-gray-600 text-base">
                  Monday-Friday: 9:00 - 22:00
                </p>
                <p className="text-gray-600 text-base">
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi! I'd like to ask about..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 resize-y"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-[#B88E2F] hover:bg-amber-800"
                  } text-white font-bold py-3 px-10 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
