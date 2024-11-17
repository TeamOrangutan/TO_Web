import React from "react";
import "../styles/components/SalesCard.css";

interface SalesCardProps {
  label: string;
  amount: string;
  isHighlighted?: boolean;
}

export const SalesCard: React.FC<SalesCardProps> = ({ label, amount, isHighlighted = false }) => {
  return (
    <div className={`sales-card ${isHighlighted ? "highlight" : "default"}`}>
      <p>{label}</p>
      <h3>{amount}</h3>
    </div>
  );
};
