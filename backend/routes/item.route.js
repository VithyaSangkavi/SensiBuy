import express from 'express';
const router = express.Router();
import * as itemController from '../controllers/item.controller.js';

router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', itemController.updateItemById);
router.delete('/:id', itemController.deleteItemById);

export default router;
