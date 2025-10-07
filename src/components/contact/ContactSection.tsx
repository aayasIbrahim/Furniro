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

  // Handle input/textarea change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
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
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email.
            Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mt-5">
          {/* Contact Info Column */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600 text-base">238 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-600 text-base">Mobile: +(84) 546-6789</p>
                <p className="text-gray-600 text-base">Hotline: +(84) 456-6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-amber-700 w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Working Time</h3>
                <p className="text-gray-600 text-base">Monday-Friday: 9:00 - 22:00</p>
                <p className="text-gray-600 text-base">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 shadow-lg ">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-sm">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jhon Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2 text-sm">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="This is an optional"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-sm">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi! I'd like to ask about"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 resize-y"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#B88E2F] hover:bg-amber-800 text-white font-bold py-3 px-10 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Submit
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
