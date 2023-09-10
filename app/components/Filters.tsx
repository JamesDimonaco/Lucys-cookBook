import React, { useState } from "react";

interface IFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function Filters({ onFilterChange }: IFiltersProps) {
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setType(newType);
    onFilterChange({ type: newType, difficulty });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = e.target.value;
    setDifficulty(newDifficulty);
    onFilterChange({ type, difficulty: newDifficulty });
  };

  return (
    <div>
      <select onChange={handleTypeChange}>
        {/* Add options for type */}
        <option value="">All</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
        <option value="dessert">Dessert</option>
        <option value="lightmeal">light Meal</option>
      </select>
      <select onChange={handleDifficultyChange}>
        {/* Add options for difficulty */}
        <option value="">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
