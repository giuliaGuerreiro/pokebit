import React from 'react';

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
          <button
            onClick={onLoadMore}
            className="btn-primary mt-2 mb-2 mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded  focus-visible:outline focus-visible:outline-2"
            aria-label="Load more items"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              'Load More Pokemons'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
