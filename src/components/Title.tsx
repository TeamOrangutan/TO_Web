import React from "react";

interface componentProps {
  label: string;
}

export const Title: React.FC<componentProps> = ({ label }) => {
  return (
    <>
      <center>
        <h1 style={{ fontSize: "20px", marginTop: "20px" }}>{label}</h1>

        <div
          style={{
            height: "1px",
            width: "50px",
            backgroundColor: "black",
            marginTop: "-10px",
            marginBottom: "10px",
          }}
        />
      </center>
    </>
  );
};
