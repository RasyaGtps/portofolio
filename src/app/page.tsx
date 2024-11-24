"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Smartphone, CheckSquare, ShoppingBag, Utensils, Code, Database, Layout, User, MapPin, Calendar, Phone } from "lucide-react";

const TypingEffect = ({ words }) => {
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

const getTechIcon = (tag) => {
  const iconMap = {
    "React Native": <Smartphone className="w-4 h-4" />,
    Laravel: <Code className="w-4 h-4" />,
    Vite: <Layout className="w-4 h-4" />,
    MySQL: <Database className="w-4 h-4" />,
  };
  return iconMap[tag] || null;
};

const ProjectCard = ({ project, index }) => {
  return (
    <div
      className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:bg-gray-800"
      style={{
        animationDelay: `${index * 200}ms`,
        opacity: 0,
        animation: `fadeIn 0.5s ease-out ${index * 200}ms forwards`,
      }}>
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

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [setIsVisible] = useState({});

  const roles = ["Full Stack Developer", "Web Developer", "Mobile Developer"];

  const projects = [
    {
      title: "Mobile Culture App",
      description: "An interactive mobile application showcasing diverse cultural heritage and traditions through an engaging user interface.",
      tags: ["React Native", "MySQL"],
      icon: <Smartphone size={24} className="text-purple-500" />,
    },
    {
      title: "Todo List Manager",
      description: "A comprehensive task management system built with Laravel, helping users organize and track their development tasks efficiently.",
      tags: ["Laravel", "MySQL"],
      icon: <CheckSquare size={24} className="text-purple-500" />,
    },
    {
      title: "Rayypedia Marketplace",
      description: "A modern e-commerce platform powered by Laravel and Vite, providing a seamless shopping experience.",
      tags: ["Laravel", "Vite", "MySQL"],
      icon: <ShoppingBag size={24} className="text-purple-500" />,
    },
    {
      title: "Restaurant Management App",
      description: "A full-featured restaurant management system built with Laravel, streamlining operations and order management.",
      tags: ["Laravel", "MySQL"],
      icon: <Utensils size={24} className="text-purple-500" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    setTimeout(() => setIsLoading(false), 2000);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const skills = [
    { name: "Frontend", percentage: 50 },
    { name: "Backend", percentage: 90 },
    { name: "Mobile", percentage: 70 },
    { name: "Database", percentage: 78 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-4xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 animate-slideDown">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold hover:text-purple-500 transition-all duration-300 transform hover:scale-110">Rasya Rayhan</h1>
            <div className="flex gap-6">
              {["home", "projects", "about", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-purple-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${activeSection === section ? "text-purple-500" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}>
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6">
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
                {[Github, Linkedin, Mail].map((Icon, index) => (
                  <a key={index} href="#" className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6" style={{ animationDelay: `${index * 100}ms` }}>
                    <Icon size={24} className="animate-float" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen py-20">
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

      <section id="contact" className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 animate-slideInFromLeft">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slideInFromLeft">
              <p className="text-gray-400 text-lg">Let's work together! Feel free to reach out for collaborations or just a friendly hello.</p>
              <div className="space-y-4">
                {[
                  { icon: <Mail size={24} />, text: "rasya23darkness@gmail.com" },
                  { icon: <Phone size={24} />, text: "+62 89515902666" },
                  { icon: <MapPin size={24} />, text: "Jawa Timur, Indonesia" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-400 hover:text-purple-500 transition-all duration-300" style={{ animationDelay: `${index * 200}ms` }}>
                    {contact.icon}
                    <span>{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <form className="space-y-6 animate-slideInFromRight">
              <div className="space-y-2">
                <label className="text-gray-400">Name</label>
                <input type="text" className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Email</label>
                <input type="email" className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="Your email" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Message</label>
                <textarea className="w-full bg-gray-900 rounded-lg p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-h-[150px]" placeholder="Your message"></textarea>
              </div>
              <button className="w-full bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">Send Message</button>
            </form>
          </div>
        </div>
      </section>
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
      `}</style>
    </div>
  );
};

export default PortfolioPage;