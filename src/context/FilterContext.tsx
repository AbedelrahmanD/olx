import React, { createContext, useContext, useState, useCallback } from 'react';

type Location = {
  externalID: string;
  name: string;
  name_l1: string;
};

type FilterState = {
  categoryID: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  location: Location;
  dynamicFilters: Record<string, any>;
};

type FilterContextType = {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  updateDynamicFilter: (key: string, value: any) => void;
  resetFilters: (categoryID?: string) => void;
};

const defaultLocation = {
  externalID: '0-1',
  name: 'Lebanon',
  name_l1: 'لبنان',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    categoryID: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    location: defaultLocation,
    dynamicFilters: {},
  });

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => {
      if (updates.categoryID && updates.categoryID !== prev.categoryID) {
        return {
          ...updates,
          categoryID: updates.categoryID,
          minPrice: undefined,
          maxPrice: undefined,
          location: prev.location,
          dynamicFilters: {},
        } as FilterState;
      }
      
      const hasChanged = Object.entries(updates).some(
        ([key, value]) => (prev as any)[key] !== value
      );

      if (!hasChanged) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  const updateDynamicFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      dynamicFilters: {
        ...prev.dynamicFilters,
        [key]: value,
      },
    }));
  }, []);

  const resetFilters = useCallback((categoryID?: string) => {
    setFilters({
      categoryID: categoryID || undefined,
      minPrice: undefined,
      maxPrice: undefined,
      location: defaultLocation,
      dynamicFilters: {},
    });
  }, []);

  return (
    <FilterContext.Provider value={{ filters, updateFilters, updateDynamicFilter, resetFilters }}>
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
