"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, User, Send, Loader2 } from "lucide-react";
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
    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 max-h-[350px] overflow-y-auto space-y-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="text-gray-300 text-center py-8">
          <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Belum ada pesan.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <User size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="font-semibold text-purple-300">{message.name}</p>
                <p className="text-xs text-gray-300">{message.email}</p>
              </div>
              <span className="ml-auto text-xs text-gray-300">
                {new Date(message.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-300 text-sm pl-12">{message.message}</p>
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

  const contactInfo = [
    { 
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "rasya23darkness@gmail.com",
      link: "mailto:rasya23darkness@gmail.com"
    },
    { 
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+62 89515902666",
      link: "tel:+6289515902666"
    },
    { 
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Jawa Timur, Indonesia",
      link: "https://maps.google.com/?q=Jawa+Timur+Indonesia"
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">
          Contact Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Messages */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 animate-slideInFromLeft">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">Let&apos;s Connect!</h3>
              <p className="text-gray-300 mb-8">
                Tertarik untuk berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya melalui:
              </p>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group"
                  >
                    <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium text-purple-300">{info.label}</p>
                      <p className="text-gray-300">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="animate-slideInFromLeft">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">Recent Messages</h3>
              <ContactMessages messages={messages} />
            </div>
          </div>

          {/* Contact Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 space-y-6 animate-slideInFromRight"
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Send Message</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Nama</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                  placeholder="Masukkan nama anda"
                  aria-label="Nama"
                />
                <User className="w-5 h-5 text-purple-500 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 pl-12 outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                  placeholder="Masukkan email anda"
                  aria-label="Email"
                />
                <Mail className="w-5 h-5 text-purple-500 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Pesan</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 min-h-[150px] resize-none"
                placeholder="Tulis pesan anda disini..."
                aria-label="Pesan"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-500 text-white p-4 rounded-xl hover:bg-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Pesan</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;