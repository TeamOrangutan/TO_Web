import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo1 from "../assets/images/Logo2.png";
import Logo from "../assets/images/Logo.png";
import "../styles/components/NavBar.css";
import { LinkHeader } from "./LinkHeader";

export const NavBar = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };
    console.log(window.location.pathname)
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <nav style={{ backgroundColor: isTop && window.location.pathname == '/' ? "transparent" : "#D9D9D9" }}>
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
            src={isTop ? Logo1 : Logo}
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
