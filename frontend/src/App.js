import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import LandingPage from './pages/LandingPage.js'
import SignupForm from "./pages/User Management/SignupForm";
import LoginForm from "./pages/User Management/LoginForm";
import AddTicketPage from "./pages/Ticket Management/AddTicketPage";
import TicketListPage from "./pages/Ticket Management/TicketListPage";
import AdminNavbar from "./components/AdminNavBar";
import AdminInterface from "./pages/AdminInterface";
import UserInterface from "./pages/UserInterface";
import Profile from "./pages/User Management/Profile";
import Profile2  from "./pages/User Management/Profile2";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
          </Route>

          <Route element={<Navbar />}>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/UserInterface" element={<UserInterface />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile2" element={<Profile2 />} />
            <Route path="/addTicket" element={<AddTicketPage/>} />
            <Route path="/TicketList" element={<TicketListPage/>} />
            <Route path="/View/:id" element={<Details/>}/>
          </Route>
          <Route element={<AdminNavbar />}>
            <Route path="/AdminInterface" element={<AdminInterface />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
