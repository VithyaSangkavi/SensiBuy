import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Item.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = (props) => {
  const { _id, name, description, price, imageUrl } = props.item;

  //const history = useNavigate();

  const [items, setItems] = useState(props.items); // Assuming you pass the list of items as a prop

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/items/${_id}`
      );
      if (response.status === 200) {
        // Handle success
        console.log('Item deleted successfully');

        toast.success('Item deleted successfully');
        // Fetch the updated list of items
        const updatedItems = await fetchUpdatedItems();
        setItems(updatedItems);
      } else {
        // Handle other status codes (e.g., not found)
        console.log('Item deletion failed:', response.status);
      }
    } catch (error) {
      // Handle Axios error
      console.error('Error deleting item:', error);
      throw error;
    }
  };

  const fetchUpdatedItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/items');
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching updated items:', error);
      return items; // Return the current list of items in case of an error
    }
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <h2>Rs {price}</h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          LinkComponent={Link}
          to={`/items/${_id}`}
          sx={{
            mt: 'auto',
            width: '100px',
            color: '#419140',
            backgroundColor: 'transparent',
            textAlign: 'center',
            paddingRight: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Update
        </Button>
        <Button
          onClick={deleteHandler}
          sx={{
            mt: 'auto',
            width: '100px',
            color: '#a8493d',
            backgroundColor: 'transparent',
            textAlign: 'center',
            paddingRight: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Delete
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Item;
