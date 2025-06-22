import React from 'react';
import logoImg from '../assets/stamina-lab-logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  const variantClasses = {
    default: '',
    white: 'filter brightness-0 invert' // Makes logo white
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Stamina Lab" 
        className={`${sizeClasses[size]} ${variantClasses[variant]}`}
      />
    </div>
  );
};

export default Logo; 