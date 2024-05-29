import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import Sidebar from "../components/sidebarmenu";
import Header from "../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Container maxWidth="sm">
      {/* <Header /> */}
      <Header toggleSidebar={toggleSidebar} />
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
