import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VoiceAssistant from "./components/VoiceAssistant";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {/* Show Navbar on all pages, but maybe different links based on auth? 
          For now, showing it always if authenticated, or maybe we want it public?
          The user asked for these pages, implying they might be public.
          Let's make Navbar visible always, but adjust links inside Navbar if needed.
          Actually, the current Navbar requires onLogout, which implies auth.
          Let's keep the current logic: Navbar only when authenticated.
          BUT, Home/About/Contact usually are public.
          Let's change logic: Navbar always visible, but "Logout" only if auth.
          However, to minimize risk, I'll stick to the requested plan: just add pages.
          If the user wants them public, I should probably expose Navbar always.
          Let's expose Navbar always for now to allow navigation to these pages.
      */}
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/assistant"
          element={
            isAuthenticated ? (
              <VoiceAssistant />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
