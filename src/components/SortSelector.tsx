// src/components/SortSelector.tsx
import React from "react";
import "../styles/pages/histories.css";

interface SortSelectorProps {
  value: string;
  labelText?: string;
  options: { label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  options,
  onChange,
  labelText = "Ordenar por:"
}) => {
  return (
    <div className="order">
      <label htmlFor="filter">{labelText}</label>
      <select id="filter" value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.label} className="option">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
