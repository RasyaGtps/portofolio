import React from 'react';
import { Braces, Code, Database, Globe, Terminal } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4" }) => {
  const getIcon = () => {
    switch (name.toLowerCase()) {
      case 'html':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-orange-500`}>
            <path d="M12 18L3 4h18l-9 14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12l-3-4h6l-3 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'css':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-blue-500`}>
            <path d="M4 3l2 17.5L12 22l6-1.5L20 3H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7h10l-1 12-4 1-4-1-1-12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'javascript':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-yellow-500`}>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 17v-7M8 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 17c0-2-1-3-2-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'react':
      case 'react native':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-blue-400`}>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8c5.5 0 10 1.8 10 4s-4.5 4-10 4-10-1.8-10-4 4.5-4 10-4z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8.5 10c2.75-4.77 6.59-7.62 8.5-6.36 1.91 1.26.41 6.05-2.34 10.82-2.75 4.77-6.59 7.62-8.5 6.36-1.91-1.26-.41-6.05 2.34-10.82z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'next.js':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-white`}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12l4 4 4-4m-4-4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'tailwind css':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-cyan-400`}>
            <path d="M12 6C9.333 6 7.333 7.333 6 10c1.333-1.333 2.667-1.833 4-1.5.87.217 1.494.841 2.186 1.532C13.654 11.5 15.164 13 18 13c2.667 0 4.667-1.333 6-4-1.333 1.333-2.667 1.833-4 1.5-.87-.217-1.494-.841-2.186-1.532C16.346 7.5 14.836 6 12 6zM6 13c-2.667 0-4.667 1.333-6 4 1.333-1.333 2.667-1.833 4-1.5.87.217 1.494.841 2.186 1.532C7.654 18.5 9.164 20 12 20c2.667 0 4.667-1.333 6-4-1.333 1.333-2.667 1.833-4 1.5-.87-.217-1.494-.841-2.186-1.532C10.346 14.5 8.836 13 6 13z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'php':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-indigo-500`}>
            <path d="M12 18c6 0 10-3 10-6s-4-6-10-6S2 9 2 12s4 6 10 6z" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 10h2c.5 0 1 .5 1 1s-.5 1-1 1H8m8-2h2c.5 0 1 .5 1 1s-.5 1-1 1h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'laravel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-red-500`}>
            <path d="M12 3l9 5v8l-9 5-9-5v-8l9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v8m-4-6l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'node.js':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-green-500`}>
            <path d="M12 21c5.523 0 10-4.477 10-10S17.523 1 12 1 2 5.477 2 11s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'express':
        return <Terminal className={`${className} text-gray-400`} />;
      case 'rest api':
        return <Globe className={`${className} text-green-400`} />;
      case 'mysql':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-blue-600`}>
            <path d="M12 3c4.97 0 9 1.343 9 3s-4.03 3-9 3-9-1.343-9-3 4.03-3 9-3z" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 6v12c0 1.657-4.03 3-9 3s-9-1.343-9-3V6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'postgresql':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-blue-400`}>
            <path d="M12 3c4.97 0 9 1.343 9 3s-4.03 3-9 3-9-1.343-9-3 4.03-3 9-3z" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 6v12c0 1.657-4.03 3-9 3s-9-1.343-9-3V6" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 12l-3 3-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'mongodb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-green-500`}>
            <path d="M12 2C8 2 4 6 4 12c0 4 2 8 4 10 1 1 2.5 1.5 4 0 1.5-1.5 4-6 4-10 0-6-4-10-8-10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2v20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'firebase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-yellow-500`}>
            <path d="M4 17l5-13 5 10-7 5-3-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14l8 5-12 3 4-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 7l-4 7 8 5-4-12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'android studio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-green-500`}>
            <path d="M5 16V8c0-3.314 3.134-6 7-6s7 2.686 7 6v8M5 16v3c0 1.657 1.343 3 3 3h8c1.657 0 3-1.343 3-3v-3M5 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="9" r="1" fill="currentColor"/>
            <circle cx="15" cy="9" r="1" fill="currentColor"/>
          </svg>
        );
      case 'expo':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`${className} text-white`}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M17.197 9c-.1.1-3.5 5.375-3.5 5.375L12 17.375l-1.697-3L7 9h10.197z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return <Code className={`${className} text-gray-400`} />;
    }
  };

  return getIcon();
};

export default TechIcon; 