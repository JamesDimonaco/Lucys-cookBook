import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import Filters from "./Filters";

interface ISearchBarProps {
  onSearchAndFilter: (term: string, filters: any) => void;
}

export default function SearchBar({ onSearchAndFilter }: ISearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any>({});

  const debouncedSearch = useCallback(
    debounce((term, filters) => {
      onSearchAndFilter(term, filters);
    }, 300),
    [onSearchAndFilter]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value, filters);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    debouncedSearch(searchTerm, newFilters);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for recipes..."
      />
      <Filters onFilterChange={handleFilterChange} />
    </div>
  );
}
