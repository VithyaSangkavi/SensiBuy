import Item from '../models/Item.js';

//get all Items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//create new item
export const createItem = async (req, res) => {
  try {
    const { name, description, price, available, imageUrl } = req.body;

    const newItem = await Item.create({
      name,
      description,
      price,
      available,
      imageUrl,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get Item by ID
// In your backend controller
export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (item) {
      // Send the item details in the response
      res.status(200).json({
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        available: item.available,
      });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//update Items
export const updateItemById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, available, imageUrl } = req.body;

  try {
    // Find the user by _id and update it
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { $set: { name, description, price, available, imageUrl } },
      { new: true } // Return the updated document
    );

    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating Item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//delete items
export const deleteItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.deleteOne({ _id: id });
    if (deletedItem.deletedCount === 1) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
