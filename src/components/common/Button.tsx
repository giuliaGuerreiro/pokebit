import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'gray-fill';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  isCentralized?: boolean;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  width,
  isLoading = false,
  isDisabled = false,
  leftIcon,
  isCentralized = false,
  className,
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
    secondary:
      'btn-secondary mt-2 mb-2 flex items-center justify-center gap-2 px-4 py-2 rounded focus-visible:outline focus-visible:outline-2 disabled:bg-gray-300',
    tertiary:
      'btn-tertiary mt-2 mb-2 flex items-center justify-center gap-2 px-4 py-2 rounded focus-visible:outline focus-visible:outline-2 disabled:bg-gray-300',
    transparent: 'text-gray-400 hover:text-gray-600 focus:outline-none',
    ['gray-fill']: 'p-1 rounded-full bg-gray-200 hover:bg-gray-300 shadow',
  };

  const spinnerSize = size === 'lg' ? 'sm' : 'xs';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <LoadingSpinner size={spinnerSize} color="current" />}
      {!isLoading && leftIcon && <span className="button-icon">{leftIcon}</span>}
      {children && children}
    </button>
  );
};

export default Button;
