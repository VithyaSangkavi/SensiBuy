import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import LandingPage from './pages/LandingPage.js'
import SignupForm from "./pages/User Management/SignupForm";
import LoginForm from "./pages/User Management/LoginForm";
import AddTicketPage from "./pages/Ticket Management/AddTicketPage";
import TicketListPage from "./pages/Ticket Management/TicketListPage";
import Details from "./components/ticketComponents/Details";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/addTicket" element={<AddTicketPage/>} />
          <Route path="/TicketList" element={<TicketListPage/>} />
          <Route path="/View/:id" element={<Details/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
