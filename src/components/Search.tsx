"use client";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import Filters from "./Filters";
import { searchRecipes } from "@/actions";
import { revalidatePath } from "next/cache";
import Router from "next/router";

interface ISearchBarProps {
  onSearchAndFilter: (term: string, filters: any) => void;
}
type FilterType =
  | {
      type: { title: string; value: string };
      difficulty: { title: string; value: string };
    }
  | {};

export default function SearchBar({ onSearchAndFilter }: ISearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterType>({});

  const debouncedSearch = useCallback(
    debounce(async (term, filters) => {
      // onSearchAndFilter(term, filters);
      console.log("here");

      searchRecipes(term);
      Router.reload();
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
    <div className="">
      <input
        className="w-full h-10 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-primary"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for recipes..."
      />
      <Filters onFilterChange={handleFilterChange} />
    </div>
  );
}
