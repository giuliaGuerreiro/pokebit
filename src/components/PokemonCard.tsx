import React from 'react';

interface IPokemonCardProps {
  name: string;
  imageUrl: string;
  onClick?: () => void;
}

// TODO: Add animation?

export const PokemonCard: React.FC<IPokemonCardProps> = ({ name, imageUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onClick?.();
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      className="cursor-pointer border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-gray-500"
      data-testid="pokemon-card"
    >
      <img src={imageUrl} alt={name} className="w-32 h-32 mx-auto" />
      <h3 className="heading-3">{name}</h3>
    </div>
  );
};
