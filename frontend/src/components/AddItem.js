import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    await axios
      .post('http://localhost:4000/api/items', {
        name: String(inputs.name),
        description: String(inputs.description),
        price: Number(inputs.price),
        imageUrl: String(inputs.imageUrl),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history('/items'));
  };

  return (
    <div
      style={{
        border: '2px solid #000', // Add your desired border style here
        paddingRight: '10px',
        paddingLeft: '10px', // Optional padding for spacing
      }}
    >
      <h1 style={{ textAlign: 'center', paddingTop: '27px' }}>
        Add New Product
      </h1>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          maxWidth={700}
          alignContent={'center'}
          alignSelf="center"
          marginLeft={'auto'}
          marginRight="auto"
          marginTop={5}
          marginBottom={20}
        >
          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel>Price</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel>Image</FormLabel>
          <TextField
            value={inputs.imageUrl}
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
              />
            }
            label="Available"
          />
          <Button variant="contained" type="submit">
            Add Product
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddItem;
