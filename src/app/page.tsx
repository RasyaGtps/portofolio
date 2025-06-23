"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Smartphone, CheckSquare, ShoppingBag, Code, Database, Layout, User, MapPin, BookOpen, Rocket, Brain, School, Terminal, Globe, Braces, Server } from "lucide-react";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";
import ContactSection from './ContactSection'
import { Commet } from "react-loading-indicators";
import TechIcon from '@/components/TechIcon';


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

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  const roles = ["Student Developer", "Web Developer", "Mobile Developer", "SMK Telkom Sidoarjo"];

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
      tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
    },
    { 
      name: "Backend",
      icon: <Server className="w-6 h-6 text-purple-500" />,
      tools: ["PHP", "Laravel", "Node.js", "Express", "REST API"]
    },
    { 
      name: "Mobile",
      icon: <Smartphone className="w-6 h-6 text-purple-500" />,
      tools: ["React Native", "Expo", "Android Studio"]
    },
    { 
      name: "Database",
      icon: <Database className="w-6 h-6 text-purple-500" />,
      tools: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"]
    },
  ];

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
            <div className="flex items-center gap-8">
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
                onClick={() => scrollToSection("contact")}
                className={`hover:text-purple-500 transition-colors ${
                  activeSection === "contact" ? "text-purple-500" : ""
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slideInFromLeft">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold leading-tight">
                Hi, I&apos;m Rasya 👋
              </h1>
              <h2 className="text-4xl font-bold text-purple-500">
                <TypingEffect words={roles} />
              </h2>
            </div>
            <p className="text-gray-400 text-lg">
              Siswa SMK Telkom Sidoarjo yang passionate dalam pengembangan web dan mobile. 
              Selalu bersemangat untuk belajar teknologi baru dan menciptakan solusi inovatif melalui kode.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/RasyaGtps"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-purple-500/20 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:text-purple-500 transition-colors" />
              </a>
              <a
                href="https://id.linkedin.com/in/rasya-rayhan-saifullah-4494b7352"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-purple-500/20 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:text-purple-500 transition-colors" />
              </a>
              <a
                href="mailto:rasya23darkness@gmail.com"
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-purple-500/20 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 group-hover:text-purple-500 transition-colors" />
              </a>
            </div>
          </div>
          <div className="relative h-[400px] animate-slideInFromRight perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl transform rotate-6 scale-95"></div>
            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm rounded-2xl transform -rotate-6 scale-95 hover:rotate-0 transition-all duration-500 border border-purple-500/20">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-purple-500" />
                      <span>Muhammad Rasya Rayhan Saifullah</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <span>Jawa Timur, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <School className="w-5 h-5 text-purple-500" />
                      <span>SMK Telkom Sidoarjo</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-purple-500/20">
                    <h3 className="text-xl font-semibold mb-4 text-purple-500">Current Focus</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-xl">
                        <Terminal className="w-5 h-5 text-purple-500" />
                        <span>Exploring New Technologies</span>
                      </div>
                      <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-xl">
                        <Globe className="w-5 h-5 text-purple-500" />
                        <span>Building Web Applications</span>
                      </div>
                      <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-xl">
                        <Brain className="w-5 h-5 text-purple-500" />
                        <span>Learning & Growing</span>
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
                  <p className="text-gray-400">Rekayasa Perangkat Lunak</p>
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
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.map((tool, toolIndex) => (
                        <div
                          key={toolIndex}
                          className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg text-sm text-purple-500 hover:bg-purple-500/20 transition-colors duration-300 cursor-default group"
                        >
                          <TechIcon name={tool} className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          <span>{tool}</span>
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