import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

export type ButtonVariant = 'primary';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  isCentralized?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  width,
  isLoading = false,
  leftIcon,
  isCentralized = false,
}) => {
  const baseClasses = `${isCentralized ? 'mx-auto' : ''} ${width ?? ''} flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };

  const variantClasses = {
    primary:
      'btn-primary mt-2 mb-2 flex items-center justify-center gap-2 px-4 py-2 rounded focus-visible:outline focus-visible:outline-2 disabled:bg-gray-300',
  };

  const spinnerSize = size === 'lg' ? 'sm' : 'xs';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading && <LoadingSpinner size={spinnerSize} color="current" />}
      {!isLoading && leftIcon && <span className="button-icon">{leftIcon}</span>}
      {children}
    </button>
  );
};

export default Button;
