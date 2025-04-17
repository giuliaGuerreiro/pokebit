import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiSearch, FiClock, FiTrash2 } from 'react-icons/fi';
import Button from './Button';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearInput: () => void;
  onSearch: () => void;
  id?: string;
  placeholder?: string;
  isHistoryEnabled?: boolean;
  historyKey?: string;
  onSelectHistory?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClearInput,
  onSearch,
  id = 'search',
  placeholder = 'Search',
  isHistoryEnabled = false,
  historyKey = 'search-history',
  onSelectHistory,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const saveToHistory = (searchTerm: string) => {
    if (!isHistoryEnabled || !searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
  };

  const handleClear = () => {
    onClearInput();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleShowHistory = () => {
    if (isHistoryEnabled && searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleSelectHistoryItem = (item: string) => {
    if (onSelectHistory) {
      onSelectHistory(item);
      setShowHistory(false);
    }
  };

  const handleRemoveHistoryItem = (event: React.MouseEvent, item: string) => {
    event.stopPropagation();

    const updatedHistory = searchHistory.filter((storedItem) => storedItem !== item);

    setSearchHistory(updatedHistory);
    setFilteredHistory(filterHistoryItems(updatedHistory, value));

    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));

    if (updatedHistory.length === 0) {
      setShowHistory(false);
    }
  };

  const clearAllHistory = () => {
    setSearchHistory([]);
    setFilteredHistory([]);
    localStorage.removeItem(historyKey);
    setShowHistory(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value.trim()) {
      if (isHistoryEnabled) {
        saveToHistory(value);
        setShowHistory(false);
      }

      onSearch();
    }
  };

  const handleSearchClick = () => {
    if (value.trim() && isHistoryEnabled) {
      saveToHistory(value);
      setShowHistory(false);
    }
    onSearch();
  };

  const filterHistoryItems = (history: string[], searchText: string): string[] => {
    if (!searchText.trim()) {
      return history;
    }

    return history.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    if (isHistoryEnabled) {
      const historyFiltered = filterHistoryItems(searchHistory, event.target.value);
      setFilteredHistory(historyFiltered);

      if (historyFiltered.length === 0 && showHistory) {
        setShowHistory(false);
      } else if (historyFiltered.length > 0 && !showHistory) {
        setShowHistory(true);
      }
    }
  };

  useEffect(() => {
    if (isHistoryEnabled) {
      const history = localStorage.getItem(historyKey);

      if (history) {
        const parsedHistory = JSON.parse(history);
        const limitedHistory = parsedHistory.slice(0, 10);
        setSearchHistory(limitedHistory);
        setFilteredHistory(filterHistoryItems(limitedHistory, value));
      }
    }
  }, [historyKey, isHistoryEnabled, value]);

  useEffect(() => {
    if (!isHistoryEnabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHistoryEnabled]);

  return (
    <div>
      {/* Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center w-[400px]">
          <div className="absolute left-3 text-gray-400">
            <FiSearch size={18} />
          </div>
          <input
            ref={inputRef}
            id={id}
            type="text"
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={isHistoryEnabled ? handleShowHistory : undefined}
            onClick={isHistoryEnabled ? handleShowHistory : undefined}
            autoComplete="off"
          />
          {value && (
            <Button
              onClick={handleClear}
              variant="transparent"
              size="sm"
              leftIcon={<FiX size={18} />}
              className="absolute right-1"
            />
          )}
        </div>

        <Button onClick={handleSearchClick} variant="secondary" aria-label="Search">
          Search
        </Button>
      </div>

      {/* History Dropdown */}
      {isHistoryEnabled && showHistory && filteredHistory.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-[400px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Recent searches</span>
            <Button onClick={clearAllHistory} variant="transparent" size="sm">
              Clean history
            </Button>
          </div>

          {/* TODO: make reusable list */}
          <ul className="py-1">
            {filteredHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectHistoryItem(item)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center group"
              >
                <div className="flex items-center space-x-2">
                  <FiClock className="text-gray-400" size={14} />
                  <span>{item}</span>
                </div>
                <Button
                  onClick={(event) => handleRemoveHistoryItem(event, item)}
                  variant="transparent"
                  size="sm"
                  leftIcon={<FiTrash2 size={14} />}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
