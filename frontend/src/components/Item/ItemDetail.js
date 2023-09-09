import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = () => {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    available: false,
  });

  const id = useParams().id;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/items/${id}`
        );
        const data = response.data;
        console.log('API Response:', data);

        if (data && data.name && data.description) {
          // Ensure that the fields you expect exist in the API response
          setInputs({
            name: data.name,
            description: data.description,
            price: data.price || 0, // Set a default value if 'price' is missing
            imageUrl: data.imageUrl || '', // Set a default value if 'imageUrl' is missing
            available: data.available || false, // Set a default value if 'available' is missing
          });
          setChecked(data.available);
        } else {
          setError('Item data not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  // Add a console.log statement here to check the content of the 'inputs' state
  //console.log('inputs:', inputs);

  const sendRequest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/items/${id}`,
        {
          name: String(inputs.name),
          description: String(inputs.description),
          price: Number(inputs.price),
          imageUrl: String(inputs.imageUrl),
          available: Boolean(checked),
        }
      );

      if (response.status === 200) {
        // Show a success toast notification for update
        toast.success('Item updated successfully');
      }

      return response.data;
    } catch (error) {
      // Handle Axios error
      console.error('Error updating item:', error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/items'));
    // Handle form submission here, e.g., update the item data on the server
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input type is 'checkbox', set the 'value' to the 'checked' property
    const inputValue = type === 'checkbox' ? checked : value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: inputValue,
    }));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingTop: '27px' }}>
        Update Product
      </h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p> // Display error message if there's an error
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            maxWidth={700}
            alignContent="center"
            alignSelf="center"
            marginLeft="auto"
            marginRight="auto"
            marginTop={5}
            marginBottom={20}
          >
            <FormLabel>Name</FormLabel>
            <TextField
              value={inputs.name || ''}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
            <FormLabel>Description</FormLabel>
            <TextField
              value={inputs.description || ''}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="description"
            />
            <FormLabel>Price</FormLabel>
            <TextField
              value={inputs.price || ''}
              onChange={handleChange}
              type="number"
              margin="normal"
              fullWidth
              variant="outlined"
              name="price"
            />
            <FormLabel>Image</FormLabel>
            <TextField
              value={inputs.imageUrl || ''}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="imageUrl"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  name="available"
                />
              }
              label="Available"
            />
            <Button variant="contained" type="submit">
              Update Product
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default ItemDetail;
