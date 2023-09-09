import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import './Item.css';

const URL = 'http://localhost:4000/api/items';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const synth = window.speechSynthesis;
  let isHovering = false;

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        items.map((item) => (
          <div
            className="item-container"
            key={item._id}
            style={{ marginBottom: '20px', marginRight: '50px' }}
            onMouseEnter={() => {
              isHovering = true;
              speakText(
                `Item name: ${item.name}. Description: ${item.description}. Price: Rs ${item.price}`
              );
            }}
            onMouseLeave={() => {
              isHovering = false;
              synth.cancel();
            }}
          >
            <img src={item.imageUrl} alt={item.name} />
            <h3
              style={{
                textAlign: 'justify',
                paddingBottom: '10px',
                fontSize: '18px',
              }}
            >
              {item.name}
            </h3>
            <p
              style={{
                textAlign: 'justify',
                paddingBottom: '10px',
                fontSize: '18px',
              }}
            >
              {item.description}
            </p>
            <h2
              style={{
                textAlign: 'justify',
                paddingBottom: '10px',
                fontSize: '20px',
              }}
            >
              Rs {item.price}
            </h2>
            <Button
              sx={{
                mt: 'auto',
                width: '100px',
                color: '#343166',
                border: '2px solid #696d91',
                backgroundColor: 'transparent',
                textAlign: 'center',
                paddingRight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                fontWeight: 'bold',
                fontSize: '16px',
                marginRight: '20px',
              }}
            >
              View
            </Button>
            <Button
              onMouseEnter={() => {
                if (isHovering) return;
                speakText(
                  `Item name: ${item.name}. Description: ${item.description}. Price: Rs ${item.price}`
                );
              }}
              onMouseLeave={() => {
                isHovering = false;
                synth.cancel();
              }}
            >
              <VolumeUp fontSize="large" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemsPage;
