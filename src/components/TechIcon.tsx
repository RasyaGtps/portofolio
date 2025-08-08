import React from 'react';
import Image from 'next/image';

interface TechIconProps {
  name: string;
  icon: string;
}

const TechIcon: React.FC<TechIconProps> = ({ name, icon }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg text-sm text-purple-500 hover:bg-purple-500/20 transition-colors duration-300 cursor-default group">
      <img 
        src={icon} 
        alt={name} 
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
      />
      <span>{name}</span>
    </div>
  );
};

export default TechIcon;