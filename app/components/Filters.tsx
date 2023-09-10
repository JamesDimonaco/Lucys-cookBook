import React, { useState } from "react";
import Select from "./Select";

interface IFiltersProps {
  onFilterChange: (filters: any) => void;
}

type Item = {
  title: string;
  value: string;
};

export default function Filters({ onFilterChange }: IFiltersProps) {
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const handleTypeChange = (value: string) => {
    setType(value);
    onFilterChange({ type: value, difficulty });
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ type, difficulty: value });
  };

  const typeItems: Item[] = [
    { title: "Any", value: "" },
    { title: "Breakfast", value: "breakfast" },
    { title: "Lunch", value: "lunch" },
    { title: "Dinner", value: "dinner" },
    { title: "Snack", value: "snack" },
    { title: "Dessert", value: "dessert" },
    { title: "Salad", value: "salad" },
    { title: "Light meal", value: "lightmeal" },
  ];

  const difficultyItems: Item[] = [
    { title: "Any", value: "" },
    { title: "Easy", value: "easy" },
    { title: "Medium", value: "medium" },
    { title: "Hard", value: "hard" },
  ];
  return (
    <div className="flex gap-4 rounded w-full">
      <Select
        name="type"
        items={typeItems}
        onChange={(type: Item) => handleTypeChange(type.value)}
      />
      <Select
        name="difficulty"
        items={difficultyItems}
        onChange={(type: Item) => handleDifficultyChange(type.value)}
      />
    </div>
  );
}
