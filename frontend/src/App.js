import React from "react";
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import LandingPage from './pages/LandingPage.js'
import SignupForm from "./pages/User Management/SignupForm";
import LoginForm from "./pages/User Management/LoginForm";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
