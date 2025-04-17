import React, { useEffect, useState } from 'react';
import Button from './Button';

type CardGridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isLoadingMore?: boolean;
  isFirstLoad?: boolean;
  onLoadMore?: () => void;
  isDetailPanelOpen?: boolean;
};

export function CardGrid<T extends { id?: string | number }>({
  items,
  renderItem,
  isLoadingMore,
  isFirstLoad,
  onLoadMore,
  isDetailPanelOpen = false,
}: CardGridProps<T>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const gridColumnsVariant = isDetailPanelOpen
    ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {true ? (
        <div
          role="list"
          className={`flex-1 overflow-y-auto pr-1 grid ${gridColumnsVariant} gap-4 auto-rows-max`}
        >
          {/* Skeleton */}
          {Array(isMobile ? 4 : 8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="cursor-default border rounded-xl shadow-sm p-4 bg-white border-gray-200 h-48"
                data-testid="pokemon-card-skeleton"
              >
                <div className="w-32 h-32 mx-auto rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-5 mt-2 mx-auto w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
        </div>
      ) : (
        <div
          role="list"
          className={`flex-1 overflow-y-auto pr-1 grid ${gridColumnsVariant} gap-4 auto-rows-max justify-items-center`}
        >
          {/* Cards */}
          {items.map((item, index) => (
            <div key={item.id ?? index} role="listitem" className="w-full max-w-md">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}

      {onLoadMore && items.length > 0 && (
        <div className="shrink-0  ">
          <Button
            onClick={onLoadMore}
            variant="primary"
            size="sm"
            width="w-42"
            isLoading={isLoadingMore}
            isCentralized
            isDisabled={isFirstLoad}
          >
            {isLoadingMore ? 'Loading...' : 'Load More Pokemons'}
          </Button>
        </div>
      )}
    </div>
  );
}
