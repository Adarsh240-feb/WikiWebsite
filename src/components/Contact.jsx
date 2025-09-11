import React from "react";
import { useState } from "react";
import "./HomePage.css"; 
import Sidebar from "./Sidebar";

const navLinks = [];

function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="main-content">
        </main>
      </div>
    </>
  );
}

export default Contact;