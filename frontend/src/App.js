import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import Items from './components/Item/Items';
import ItemDetail from './components/Item/ItemDetail';
import ItemsPage from './components/Item/ItemsPage';
function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<AddItem />} exact />
          <Route path="/items" element={<Items />} exact />
          <Route path="/itemsUser" element={<ItemsPage />} exact />
          <Route path="/items/:id" element={<ItemDetail />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
