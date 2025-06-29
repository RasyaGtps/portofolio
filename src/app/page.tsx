"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Smartphone, CheckSquare, ShoppingBag, Code, Database, Layout, User, MapPin, BookOpen, Rocket, Brain, School, Terminal, Globe, Braces, Server, X, Menu } from "lucide-react";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";
import ContactSection from './ContactSection'
import { Commet } from "react-loading-indicators";
import TechIcon from '@/components/TechIcon';
import Link from "next/link";


interface TypingEffectProps {
  words: string[];
}

const TypingEffect = ({ words }: TypingEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const wordPause = 2000;

    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), wordPause);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-purple-500">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

type IconMapType = {
  "React Native": React.ReactNode;
  Laravel: React.ReactNode;
  Vite: React.ReactNode;
  MySQL: React.ReactNode;
};

const getTechIcon = (tag: string): React.ReactNode => {
  const iconMap: IconMapType = {
    "React Native": <Smartphone className="w-4 h-4" />,
    Laravel: <Code className="w-4 h-4" />,
    Vite: <Layout className="w-4 h-4" />,
    MySQL: <Database className="w-4 h-4" />,
  };
  return iconMap[tag as keyof IconMapType] || null;
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  image: string;
  isMobile?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <div
      className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:bg-gray-800"
      style={{
        animationDelay: `${index * 200}ms`,
        opacity: 0,
        animation: `fadeIn 0.5s ease-out ${index * 200}ms forwards`,
      }}>
      <div className={`relative w-full mb-6 overflow-hidden rounded-lg ${project.isMobile ? 'h-[400px]' : 'h-[225px]'}`}>
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className={`object-contain transition-transform duration-300 hover:scale-110 ${project.isMobile ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      <div className="flex items-center gap-3 mb-4">
        {project.icon}
        <h3 className="text-2xl font-bold">{project.title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm transform transition-all duration-300 hover:scale-110 hover:bg-purple-500/30 flex items-center gap-2">
            {getTechIcon(tag)}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

interface Certificate {
  filename: string;
  path: string;
  type: string;
}

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roles = ["Web Developer", "Mobile Developer", "SMK Telkom Sidoarjo"];

  const projects = [
    {
      title: "Mobile Culture App",
      description: "Aplikasi mobile interaktif yang menampilkan keberagaman warisan budaya dan tradisi Indonesia melalui antarmuka yang menarik.",
      tags: ["React Native", "MySQL"],
      icon: <Smartphone size={24} className="text-purple-500" />,
      image: "/projects/budaya.png",
      isMobile: true
    },
    {
      title: "Todo List Manager",
      description: "Sistem manajemen tugas yang dibangun dengan Laravel, membantu pengguna mengorganisir dan melacak tugas pengembangan mereka secara efisien.",
      tags: ["Laravel", "MySQL"],
      icon: <CheckSquare size={24} className="text-purple-500" />,
      image: "/projects/todo.png"
    },
    {
      title: "Rayypedia Marketplace",
      description: "Platform e-commerce modern yang ditenagai oleh Laravel dan Vite, menyediakan pengalaman berbelanja yang mulus.",
      tags: ["Laravel", "Vite", "MySQL"],
      icon: <ShoppingBag size={24} className="text-purple-500" />,
      image: "/projects/rayypedia.png"
    },
  ];

  const skills = [
    { 
      name: "Frontend", 
      icon: <Braces className="w-6 h-6 text-purple-500" />,
      tools: [
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }
      ]
    },
    { 
      name: "Backend",
      icon: <Server className="w-6 h-6 text-purple-500" />,
      tools: [
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Laravel", icon: "https://www.vectorlogo.zone/logos/laravel/laravel-icon.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "REST API", icon: "https://www.svgrepo.com/show/375531/api.svg" }
      ]
    },
    { 
      name: "Mobile",
      icon: <Smartphone className="w-6 h-6 text-purple-500" />,
      tools: [
        { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Expo", icon: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg" },
        { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" }
      ]
    },
    { 
      name: "Database",
      icon: <Database className="w-6 h-6 text-purple-500" />,
      tools: [
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
      ]
    }
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/certificates');
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-80px 0px -20% 0px'
      }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll("section[id]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset - 100;
        const sectionHeight = rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Commet color="#A855F7" size="medium" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 animate-slideDown">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Rasya<span className="text-purple-500">.</span>
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "home" ? "text-purple-500" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "about" ? "text-purple-500" : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "projects" ? "text-purple-500" : ""
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("certificates")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "certificates" ? "text-purple-500" : ""
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "contact" ? "text-purple-500" : ""
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-purple-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu Sidebar */}
          <div 
            className={`fixed inset-y-0 left-0 w-64 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden z-50`}
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">
                  Rasya<span className="text-purple-500">.</span>
                </h1>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-purple-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    scrollToSection("home");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-purple-500 transition-colors ${
                    activeSection === "home" ? "text-purple-500" : ""
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection("about");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-purple-500 transition-colors ${
                    activeSection === "about" ? "text-purple-500" : ""
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    scrollToSection("projects");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-purple-500 transition-colors ${
                    activeSection === "projects" ? "text-purple-500" : ""
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => {
                    scrollToSection("certificates");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-purple-500 transition-colors ${
                    activeSection === "certificates" ? "text-purple-500" : ""
                  }`}
                >
                  Certificates
                </button>
                <button
                  onClick={() => {
                    scrollToSection("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-purple-500 transition-colors ${
                    activeSection === "contact" ? "text-purple-500" : ""
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Overlay for mobile menu */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8 animate-slideInFromLeft">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full w-fit">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm md:text-base text-white">Available for Collaboration</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight flex items-center gap-2">
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 text-transparent bg-clip-text">
                  Hi, I&apos;m Rasya
                </span>
                <span className="inline-block animate-wave origin-[70%] text-white">
                  👋
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold">
                <span className="text-purple-400">
                  <TypingEffect words={roles} />
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-200 max-w-xl">
                Siswa SMK Telkom Sidoarjo yang passionate dalam pengembangan web dan mobile. Selalu bersemangat untuk belajar teknologi baru dan menciptakan solusi inovatif melalui kode.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/rasyarayhan"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-colors text-white"
                >
                  <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="text-white" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/rasyarayhan"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full transition-colors text-white"
                >
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="text-white" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href="mailto:rasyarayhan@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors text-white"
                >
                  <Image src="/icons/email.svg" alt="Email" width={20} height={20} className="text-white" />
                  <span>Email</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] animate-slideInFromRight perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl transform rotate-6 scale-95 animate-pulse"></div>
            <div className="absolute inset-0 bg-[#1a1a1a] backdrop-blur-sm rounded-2xl transform -rotate-6 scale-95 hover:rotate-0 transition-all duration-500 border border-purple-500/20 group hover:border-purple-500/40">
              <div className="p-6 h-full flex flex-col">
                {/* Header with dots */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500">portfolio.tsx</div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  {/* Profile Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-900/30 p-2 rounded-lg">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-purple-400 font-medium">Name</h4>
                        <p className="text-gray-400">Muhammad Rasya Rayhan Saifullah</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-900/30 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-purple-400 font-medium">Location</h4>
                        <p className="text-gray-400">Jawa Timur, Indonesia</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-900/30 p-2 rounded-lg">
                        <School className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-purple-400 font-medium">Education</h4>
                        <p className="text-gray-400">SMK Telkom Sidoarjo</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Focus */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">Current Focus</h3>
                    <div className="space-y-2.5">
                      <div className="bg-purple-900/30 p-2.5 rounded-xl transform transition-all duration-300 hover:bg-purple-900/40">
                        <div className="flex items-center gap-3">
                          <Terminal className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300">Exploring New Technologies</span>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 p-2.5 rounded-xl transform transition-all duration-300 hover:bg-purple-900/40">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300">Building Web Applications</span>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 p-2.5 rounded-xl transform transition-all duration-300 hover:bg-purple-900/40">
                        <div className="flex items-center gap-3">
                          <Brain className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300">Learning & Growing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-slideInFromLeft">
              <p className="text-gray-400 text-lg leading-relaxed">
                Saya adalah siswa SMK Telkom Sidoarjo yang memiliki passion dalam dunia pengembangan web dan mobile. 
                Perjalanan saya dalam programming dimulai dari rasa penasaran tentang bagaimana teknologi bekerja, 
                dan berkembang menjadi hasrat untuk menciptakan solusi digital yang inovatif.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Di luar jam sekolah, saya aktif mengembangkan diri dengan mempelajari teknologi baru, 
                berkontribusi dalam proyek open-source, dan mengerjakan proyek-proyek personal yang 
                menantang kemampuan dan kreativitas saya.
              </p>
              <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-xl">
                <School className="w-8 h-8 text-purple-500" />
                <div>
                  <h3 className="font-semibold">SMK Telkom Sidoarjo</h3>
                  <p className="text-gray-400">Sistem Informasi Jaringan dan Aplikasi</p>
                </div>
              </div>
            </div>
            <div className="space-y-8 animate-slideInFromRight">
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="grid gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {skill.icon}
                      <h4 className="text-xl font-medium">{skill.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skill.tools.map((tool, toolIndex) => (
                        <div
                          key={toolIndex}
                          className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg text-sm text-purple-500 hover:bg-purple-500/20 transition-colors duration-300 cursor-default group"
                        >
                          <img 
                            src={tool.icon} 
                            alt={tool.name} 
                            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span>{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">
            My Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate: Certificate, index: number) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:bg-gray-800 animate-fadeIn cursor-pointer"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
                onClick={() => setSelectedCertificate(certificate)}
              >
                <div className="relative w-full h-[225px] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={certificate.path}
                    alt="Certificate"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden">
            <Image
              src={selectedCertificate.path}
              alt="Certificate"
              fill
              className="object-contain"
              quality={100}
            />
            <button
              className="absolute top-4 right-4 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors"
              onClick={() => setSelectedCertificate(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <ContactSection />

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}