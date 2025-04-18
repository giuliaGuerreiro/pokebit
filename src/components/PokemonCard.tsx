import React from 'react';

interface IPokemonCardProps {
  name: string;
  imageUrl: string;
  onClick?: () => void;
  isSelected?: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const PokemonCard: React.FC<IPokemonCardProps> = ({
  name,
  imageUrl,
  onClick,
  isSelected = false,
  cardRef,
}) => {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onClick?.();
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      className={`cursor-pointer border rounded-xl shadow-sm p-4 transition
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
        hover:shadow-lg ${isSelected ? 'bg-gray-200 border-gray-500' : 'bg-white border-gray-200'}`}
      data-testid="pokemon-card"
    >
      <img src={imageUrl} alt={name} className="w-32 h-32 mx-auto" />
      <h3
        className="font-bold capitalize text-center text-sm truncate w-full max-w-full break-words"
        title={name}
      >
        {name}
      </h3>
    </div>
  );
};
