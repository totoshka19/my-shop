import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <button className={`px-4 py-2 rounded transition-colors duration-300 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 