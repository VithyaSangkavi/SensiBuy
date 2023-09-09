import React, { useEffect, useState } from 'react';
import './Item.css';
import axios from 'axios';
import Item from './Item';

const URL = 'http://localhost:4000/api/items';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Items = () => {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setItems(data); // Data directly from the API response
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Handle errors by setting loading state to false
      });
  }, []);
  return (
    <div className="homescreen">
      <h1 className="homescreen__title">List of Products</h1>
      <div className="homescreen__products">
        {isLoading ? (
          <p>Loading...</p> // Show loading indicator
        ) : (
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                <Item item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Items;
