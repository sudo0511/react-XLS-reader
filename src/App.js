import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div id="xlsx-app">
      <nav className="nav-header">
        <Link id="heading" to="/">
          React XLS Reader
        </Link>
        <Link id="about" to="/about">
          About
        </Link>
        <Link id="contact" to="/contact">
          Contact
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
