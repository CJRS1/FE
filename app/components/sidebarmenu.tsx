import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useState } from "react";

function Sidebar({ showSidebar } : any) {

    // const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // // Función para mostrar el sidebar con retardo
    // const showSidebarWithDelay = () => {
    //   setIsSidebarVisible(true);
    //   setTimeout(() => {
    //     showSidebar();
    //   }, 100); // Ajusta el retardo según lo deseado (en milisegundos)
    // };

  return (
    <nav className={`sidebarmenu_container ${
        showSidebar ? "sidebarmenu_container_show" : "sidebarmenu_container_hide"
      }`}>
      <ul>
        <li >
          <PermContactCalendarIcon />
          <Link to="/usuario" className="menu_option">Usuario</Link>
        </li>
        <li>
          <PermContactCalendarIcon />
          <Link to="/usuario" className="menu_option">Lista de Área</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
