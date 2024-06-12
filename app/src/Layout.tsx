import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import Sidebar from "../components/sidebarmenu";
import Header from "../components/header";
import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/server-runtime";
import authenticator from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { jwtDecode } from "jwt-decode";
import { useLoaderData } from "@remix-run/react";

type User = {
  nombre: string;
  apellido: string;
};

export default function Layout({ children, user }: { children: React.ReactNode, user: User } ) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Container maxWidth="sm">
      {/* <Header /> */}
      <Header toggleSidebar={toggleSidebar} user={user} />
      <div className="container">
        {/* <Sidebar /> */}
        <Sidebar showSidebar={showSidebar} />
        <div
          className={`${
            showSidebar ? "windows_container" : "windows_container_full"
          }`}
        >
          {children}
        </div>
      </div>
      {/* <ProTip /> */}
    </Container>
  );
}


