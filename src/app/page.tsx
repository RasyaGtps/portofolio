"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Smartphone, CheckSquare, ShoppingBag, Utensils, Code, Database, Layout, User, MapPin, Calendar, Phone, Download } from "lucide-react";
import Image from "next/image";
import ParticlesBackground from "../components/ParticlesBackground";
import CursorTrail from "../components/CursorTrail";
import ContactSection from './ContactSection'
import { Commet } from "react-loading-indicators";


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
  const [certificates, setCertificates] = useState<{ filename: string; path: string; type: string }[]>([]);

  const roles = ["Full Stack Developer", "Web Developer", "Mobile Developer"];

  const projects = [
    {
      title: "Mobile Culture App",
      description: "An interactive mobile application showcasing diverse cultural heritage and traditions through an engaging user interface.",
      tags: ["React Native", "MySQL"],
      icon: <Smartphone size={24} className="text-purple-500" />,
      image: "/projects/budaya.png",
      isMobile: true
    },
    {
      title: "Todo List Manager",
      description: "A comprehensive task management system built with Laravel, helping users organize and track their development tasks efficiently.",
      tags: ["Laravel", "MySQL"],
      icon: <CheckSquare size={24} className="text-purple-500" />,
      image: "/projects/todo.png"
    },
    {
      title: "Rayypedia Marketplace",
      description: "A modern e-commerce platform powered by Laravel and Vite, providing a seamless shopping experience.",
      tags: ["Laravel", "Vite", "MySQL"],
      icon: <ShoppingBag size={24} className="text-purple-500" />,
      image: "/projects/rayypedia.png"
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

    const loadCertificates = async () => {
      try {
        const response = await fetch("/api/certificates");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCertificates(data);
        } else {
          console.error("Invalid certificate data:", data);
          setCertificates([]);
        }
      } catch (error) {
        console.error("Error loading certificates:", error);
        setCertificates([]);
      }
    };

    loadCertificates();

    setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
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

  const skills = [
    { name: "Frontend", percentage: 40 },
    { name: "Backend", percentage: 85 },
    { name: "Mobile", percentage: 70 },
    { name: "Database", percentage: 80 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Commet 
          color="#A855F7"
          size="medium"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 animate-slideDown">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold hover:text-purple-500 hover:glow-purple transition-all duration-300 transform hover:scale-110">
              Rasya Rayhan
            </h1>
            <div className="flex gap-6">
              {["home", "about", "projects", "certificates", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-purple-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                    ${activeSection === section ? "text-purple-500 glow-purple" : ""}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}>
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>{" "}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
        <ParticlesBackground />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold leading-tight animate-slideInFromLeft">
              Hi, I&apos;m <span className="text-purple-500 animate-bounce">Rasya</span>
              <br />
              <TypingEffect words={roles} />
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl animate-slideInFromRight">Just ordinary programmer</p>
            <div className="flex gap-4 animate-slideInFromBottom">
              <button onClick={() => scrollToSection("contact")} className="px-6 py-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-2">
                Contact Me <ArrowUpRight size={20} className="animate-bounce" />
              </button>
              <div className="flex gap-4">
                <a href="https://github.com/RasyaGtps" target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6" style={{ animationDelay: '0ms' }}>
                  <Github size={24} className="animate-float" />
                </a>
                <a href="https://id.linkedin.com/in/rasya-rayhan-saifullah-4494b7352" target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6" style={{ animationDelay: '100ms' }}>
                  <Linkedin size={24} className="animate-float" />
                </a>
                <a href="mailto:rasya23darkness@gmail.com" className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6" style={{ animationDelay: '200ms' }}>
                  <Mail size={24} className="animate-float" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slideInFromLeft">
              <div className="flex items-center gap-4">
                <User size={24} className="text-purple-500" />
                <h3 className="text-2xl font-bold">Who am I?</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                A passionate Full Stack Developer with expertise in web and mobile development. I love creating elegant solutions to complex problems and am constantly learning new technologies to stay at the forefront of development.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-purple-500" />
                  <span>Based in Indonesia</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="text-purple-500" />
                  <span>3+ Years of Experience</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-slideInFromRight">
              {skills.map((skill, index) => (
                <div key={skill.name} className="bg-gray-800 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-700" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-bold">{skill.name}</h4>
                    <span className="text-purple-500">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full animate-grow" style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section id="certificates" className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">My Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 200}ms`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 200}ms forwards`,
                }}>
                <div className="relative w-full h-64">
                  <Image src={cert.path} alt={cert.filename} layout="fill" objectFit="contain" className="bg-white p-4" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">{cert.filename}</h3>
                  <button onClick={() => window.open(cert.path, "_blank")} className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-all duration-300">
                    <Download size={16} />
                    Download {cert.type.toUpperCase()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 1s ease-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 1s ease-out;
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .glow-purple {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5),
                       0 0 20px rgba(168, 85, 247, 0.3),
                       0 0 30px rgba(168, 85, 247, 0.2);
        }

        .hover\:glow-purple:hover {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5),
                       0 0 20px rgba(168, 85, 247, 0.3),
                       0 0 30px rgba(168, 85, 247, 0.2);
        }

        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.5),
                         0 0 20px rgba(168, 85, 247, 0.3),
                         0 0 30px rgba(168, 85, 247, 0.2);
          }
          50% {
            text-shadow: 0 0 15px rgba(168, 85, 247, 0.6),
                         0 0 25px rgba(168, 85, 247, 0.4),
                         0 0 35px rgba(168, 85, 247, 0.3);
          }
          100% {
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.5),
                         0 0 20px rgba(168, 85, 247, 0.3),
                         0 0 30px rgba(168, 85, 247, 0.2);
          }
        }

        .glow-purple {
          animation: glowPulse 2s infinite;
        }
      `}</style>
    </div>
  );
}