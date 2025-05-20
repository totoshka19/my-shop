import React from 'react';
import Button from '../Button/Button';

export type SortOrder = 'asc' | 'desc' | null;

interface SortOptionsProps {
  onSortChange: (order: SortOrder) => void;
  currentSort: SortOrder;
}

function SortOptions({ onSortChange, currentSort }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-semibold">Sort by Price:</span>
      <Button 
        onClick={() => onSortChange('asc')}
        className={`p-2 ${
          currentSort === 'asc'
            ? 'bg-custom-taupe-dark text-white'
            : 'bg-white border border-custom-taupe-medium text-custom-taupe-dark hover:bg-custom-taupe-medium hover:text-white'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
        </svg>
      </Button>
      <Button 
        onClick={() => onSortChange('desc')}
        className={`p-2 ${
          currentSort === 'desc'
            ? 'bg-custom-taupe-dark text-white'
            : 'bg-white border border-custom-taupe-medium text-custom-taupe-dark hover:bg-custom-taupe-medium hover:text-white'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
        </svg>
      </Button>
       {currentSort && (
        <Button
          onClick={() => onSortChange(null)}
          className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </Button>
      )}
    </div>
  );
}

export default SortOptions; 