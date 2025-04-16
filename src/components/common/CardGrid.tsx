import React from 'react';
import Button from './Button';

type CardGridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  onLoadMore?: () => void;
};

// TODO: Define height and add scroll
// TODO: Add skeleton
// TODO: Add Loader within Load more button

// TODO: Only show Load button when length > 0

export function CardGrid<T extends { id?: string | number }>({
  items,
  renderItem,
  isLoading,
  onLoadMore,
}: CardGridProps<T>) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div
        role="list"
        className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {items.map((item, index) => (
          <div key={item.id ?? index} role="listitem">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {onLoadMore && (
        <div className="shrink-0 py-2">
          <Button
            onClick={onLoadMore}
            variant="primary"
            size="sm"
            width="w-40"
            isLoading={isLoading}
            isCentralized
          >
            {isLoading ? 'Loading...' : 'Load More Pokemons'}
          </Button>
        </div>
      )}
    </div>
  );
}
