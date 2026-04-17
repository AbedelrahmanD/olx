import React, { createContext, useContext, useState } from 'react';

type Location = {
  externalID: string;
  name: string;
  name_l1: string;
};

type FilterState = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  location: Location;
};

type FilterContextType = {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
};

const defaultLocation = {
  externalID: '0-1',
  name: 'Lebanon',
  name_l1: 'لبنان',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: undefined,
    maxPrice: undefined,
    location: defaultLocation,
  });

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      location: defaultLocation,
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
