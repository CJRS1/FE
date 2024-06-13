import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, json, Link } from "@remix-run/react";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import headerStyles from "../styles/header.css";
import greetings from "../utils/greetings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import "../styles/header.css";
import authenticator from "~/services/auth.server";
import getfirstword from "../utils/getfirstword";
import getpagebyurl from "../utils/getpagebyurl";
import getfirstletter from "../utils/getfirstletter";


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: headerStyles,
  },
];

type User = {
  nombre: string;
  apellido: string;
};

export default function Header({
  toggleSidebar,
  user,
}: {
  toggleSidebar: any;
  user: User;
}) {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const location = useLocation()
  console.log('location',location.pathname)
  const page = getpagebyurl(location.pathname)

  const nombre = getfirstword(user.nombre);
  const letra_nombre = getfirstletter(user.nombre);
  const apellido = getfirstword(user.apellido);
  const letra_apellido = getfirstletter(user.apellido);

  const handleClickShowMenu = () => {
    setShowMenu((show) => {
      console.log("hola"); // Imprime 'hola' en la consola
      return !show; // Alterna el estado de showMenu
    });
  };

  console.log("menu", showMenu);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);


  const horaActual = new Date().getHours();
  const hi = greetings(horaActual);
  return (
    <header className="header_container">
      <nav>
        <ul>
          <li className="title_page">{page} </li>
          <li>
            <button className="button_sidebar" onClick={toggleSidebar}>
              <MenuIcon />
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <button className="profile_section" onClick={handleClickShowMenu}>
              <span>
                {letra_nombre}
                {letra_apellido}
              </span>
              <SettingsIcon />
            </button>
          </li>
        </ul>
        <div
          // ref={menuRef}
          className={`${showMenu ? "user_info" : "user_info user_info_hide"}`}
        >
          <div className="name_color_container">
            <h3>
              <strong>{hi},</strong> {nombre} {apellido}
            </h3>
            <MaterialUISwitch />
          </div>
          <h4>
            <strong>Contador</strong>
          </h4>
          <hr />
          <ul>
            <li>
              <ManageAccountsIcon sx={{ fontSize: 25 }} />
              <span>Configuración</span>
            </li>
            <li>
              <Form method="post" action="/logout">
                <button type="submit" className="logout_button">
                  <LogoutIcon sx={{ fontSize: 25 }} />
                  <span>Cerrar sesión</span>
                </button>
              </Form>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
