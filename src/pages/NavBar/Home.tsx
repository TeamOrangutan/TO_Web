import React from "react";
import { Title } from "../../components/Title";
import "../../styles/Home.css";
import { ListImages } from "../../components/ListImages";

export const Home = () => {
  return (
    <>
      <ListImages />
      <Title label="EXPLORAR COLECCION" />

      <div className="parent">
        <div className="item"> Hello</div>
        <div className="item"> Hello</div>
        <div className="item"> Hello</div>
        <div className="item"> Hello</div>
      </div>
    </>
  );
};
