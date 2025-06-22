"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, User } from "lucide-react";
import { toast } from 'react-hot-toast'; // Pastikan Anda sudah menginstal react-hot-toast

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string; // Perlu diingat bahwa ini adalah string dari DB (ISO string)
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Komponen untuk menampilkan pesan-pesan
const ContactMessages = ({ messages }: { messages: Contact[] }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg max-h-[250px] overflow-y-auto space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada pesan.</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="border-b border-gray-700 pb-4 last:border-none">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-purple-500" />
              <h4 className="font-semibold">{message.name}</h4>
            </div>
            <p className="text-gray-400 text-sm mb-2">{message.message}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail size={12} />
              <span>{message.email}</span>
              <span className="ml-auto">
                {/* Pastikan created_at adalah format yang valid untuk Date */}
                {message.created_at ? new Date(message.created_at).toLocaleDateString() : 'Tanggal tidak tersedia'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Komponen Contact utama
const ContactSection = () => {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []); // Hanya dijalankan sekali saat komponen mount

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data: ApiResponse<Contact[]> = await response.json();
      
      if (!response.ok) {
        // Jika response.ok adalah false (misal status 4xx, 5xx), error
        throw new Error(data.error || 'Failed to load messages: Server responded with error');
      }

      // Pastikan data.success adalah true dan data.data ada
      if (data.success && data.data) {
        setMessages(data.data);
      } else {
        // Jika response.ok true tapi success: false, ini juga error
        throw new Error(data.error || 'Failed to load messages: Invalid response data');
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat memuat pesan';
      console.error('Error loading messages:', errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse<Contact> = await response.json(); // Sekarang mengharapkan satu Contact

      if (!response.ok) {
        // Jika response.ok adalah false, error
        throw new Error(data.error || 'Failed to send message: Server responded with error');
      }

      if (data.success && data.data) { // Pastikan data.data ada
        toast.success('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
        // Tambahkan pesan yang baru ke daftar tanpa perlu load ulang semua
        setMessages(prevMessages => [data.data as Contact, ...prevMessages]);
      } else {
        // Jika response.ok true tapi success: false, ini juga error
        throw new Error(data.error || 'Failed to send message: Invalid response data');
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pesan';
      console.error('Error sending message:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">
          Contact Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-slideInFromLeft">
            <p className="text-gray-400 text-lg">
              Let&apos;s work together! Feel free to reach out for collaborations or just a friendly hello
            </p>
            <div className="space-y-4">
              <div className="space-y-4">
                {[
                  { icon: <Mail size={24} />, text: "rasya23darkness@gmail.com" },
                  { icon: <Phone size={24} />, text: "+62 89515902666" },
                  { icon: <MapPin size={24} />, text: "Jawa Timur, Indonesia" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-400 hover:text-purple-500 transition-all duration-300">
                    {contact.icon}
                    <span>{contact.text}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-semibold mt-8 mb-4">Pesan Terbaru</h3>
              <ContactMessages messages={messages} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 animate-slideInFromRight">
            <div className="space-y-2">
              <label className="text-gray-400">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="Nama anda"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="Email anda"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-400">Pesan</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-h-[150px]"
                placeholder="Pesan anda"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;