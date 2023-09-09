import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import TicketList from '../../components/ticketComponents/ticketList';
import "../../TicketList.css";
import AddTicketPage from './AddTicketPage';
import AddTicketForm from '../../components/ticketComponents/addTicketForm';


const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    // Fetch tickets from the database
    axios.get('http://localhost:4000/api/tickets/').then((response) => {
      setTickets(response.data);
    });
  }, []);

  const handleView = (ticketId) => {
    // Implement the logic for viewing a ticket
  };

  const handleEdit = (ticketId) => {
    // Implement the logic for editing a ticket
  };

  const handleDelete = (ticketId) => {
    // Implement the logic for deleting a ticket
  };

  const handleAdd = (ticketId) => {
  };
  return (
    <div className="container">
      <br/><br/>
      <h1>Ticket List</h1>

      <div className='add_btn mt-2'>
        <button className='btn btn-primary' onClick={AddTicketPage}> Raise A Ticket</button>
      </div>
      <TicketList
        tickets={tickets}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TicketListPage;
