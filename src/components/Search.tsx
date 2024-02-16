"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";

type FilterType =
  | {
      type: { title: string; value: string };
      difficulty: { title: string; value: string };
    }
  | {};

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterType>({});
  const [query] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }
    router.push(`/?search=${query}`);
  }, [query, router]);

  return (
    <Input
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1"
      placeholder="Search recipes..."
      type="search"
    />
  );
}
