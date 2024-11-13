import React from "react";

interface componentProps {
  label: string;
}

export const Title: React.FC<componentProps> = ({ label }) => {
  return (
    <>
      <h1>{label}</h1>
      <div
        style={{
          height: "2px",
          width: "50px",
          backgroundColor: "black",
          marginTop: "-10px",
        }}
      />
    </>
  );
};
