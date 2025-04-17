import React from 'react';

type SpinnerVariant = 'page' | 'component';

interface ILoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  variant?: SpinnerVariant;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = 'md',
  color = 'current',
  variant = 'component',
}) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClass = color === 'current' ? 'border-current' : `border-${color}`;

  const variantClass =
    variant === 'page'
      ? 'h-12 w-12 border-t-4 border-b-4 border-pokebit-yellow'
      : `inline-block border ${sizeMap[size]} ${colorClass} border-t-transparent`;
  return (
    <span
      className={` rounded-full animate-spin ${variantClass}`}
      aria-hidden="true"
      role="status"
    />
  );
};

export default LoadingSpinner;
