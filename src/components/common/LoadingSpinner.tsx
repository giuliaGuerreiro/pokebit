import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'current' }) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClass = color === 'current' ? 'border-current' : `border-${color}`;

  return (
    <span
      className={`inline-block rounded-full animate-spin border ${sizeMap[size]} ${colorClass} border-t-transparent`}
      aria-hidden="true"
      role="status"
    />
  );
};

export default LoadingSpinner;
