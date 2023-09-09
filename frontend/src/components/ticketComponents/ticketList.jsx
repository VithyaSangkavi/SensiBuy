import React from 'react';
import "../../TicketList.css";

const TicketList = ({ tickets, onView, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{ticket.tTitle}</td>
            <td>{ticket.tType}</td>
            <td>{ticket.tDate}</td>
            <td>{ticket.tStatus}</td>
            <td>
                <button onClick={() => onView(ticket._id)} className="view">View</button>
                <button onClick={() => onEdit(ticket._id)} className="edit">Edit</button>
                <button onClick={() => onDelete(ticket._id)} className="delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketList;
