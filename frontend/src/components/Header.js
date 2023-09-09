import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [value, setValue] = useState();

  return (
    <div>
      {/* Padding for the upper navigation bar */}
      <div style={{ paddingTop: '20px' }}>
        {/* Your upper navigation bar can go here */}
        {/* For example, you can add a simple navigation list */}
        <ul>
          <li></li>
          <li></li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>

      <AppBar sx={{ backgroundColor: '#696d91' }} position="sticky">
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              <ShoppingBasketIcon />
            </Typography>
            <Typography variant="h6" style={{ marginLeft: '8px' }}>
              FEATURED PRODUCTS
            </Typography>
          </div>
          <Tabs
            sx={{ ml: 'auto' }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Items" />
            <Tab LinkComponent={NavLink} to="/items" label="Items" />
            <Tab LinkComponent={NavLink} to="/itemsUser" label="User View" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
