import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo1 from "../assets/images/Logo2.png";
import Logo from "../assets/images/Logo.png";
import "../styles/components/NavBar.css";
import { LinkHeader } from "./share/LinkHeader";

export const NavBar = () => {
  const [isTop, setIsTop] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    setIsTop(window.scrollY === 0);
  }, [location]);

  return (
    <nav
      style={{
        backgroundColor:
          isTop && location.pathname === "/" ? "transparent" : "#D9D9D9",
      }}
    >
      <ul>
        <li>
          <LinkHeader isTop={isTop} label="Inicio" route="/" />
        </li>
        <li>
          <LinkHeader isTop={isTop} label="Productos" route="Products" />
        </li>
      </ul>
      <Link to="/">
        <img
          src={isTop && location.pathname === "/" ? Logo1 : Logo}
          alt="PrimalGarage Logo"
          className="Logo"
        />
      </Link>
      <ul>
        <li>
          <LinkHeader isTop={isTop} label="Historial" route="Histories" />
        </li>
        <li>
          <LinkHeader
            isTop={isTop}
            label="Acerca de Nosotros"
            route="AboutUs"
          />
        </li>
      </ul>
    </nav>
  );
};
