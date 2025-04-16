"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-[#080525] text-white px-[20px] sm:px-[100px] py-[130px]">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full pt-[10px] pb-[10px] text-center">
          <h1 className="text-[48px] font-family-sora font-semibold text-center">Contact Us</h1>
        </div>
        <div className="w-full py-[10px]">
          <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full">
          </div>
        </div>
        <div className="w-[300px] sm:w-[527px] py-[30px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block font-family-poppins text-[18px] font-bold py-[10px]">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[18px] font-bold py-[10px]">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[18px] font-bold py-[10px]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[18px] font-bold py-[10px]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full h-[268px] px-3 py-2 border-1 border-[#00AEB9] bg-[#1C1840] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex justify-center items-center pt-[20px]">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-gradient-to-b from-[#F091C9] to-[#EC008C] font-family-sora text-[25px] text-white py-3 rounded-[45px] transition-colors text-center flex justify-center items-center cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}