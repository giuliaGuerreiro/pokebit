import React, { useRef } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

interface ISearchInputProps {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearInput: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  id = 'search',
  placeholder = 'Search',
  value,
  onChange,
  onClearInput,
  onKeyDown,
  label = 'Search',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onClearInput();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-[400px]">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
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
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
