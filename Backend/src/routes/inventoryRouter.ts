import { Router } from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import { checkInventory } from '../controllers/inventoryController.js';


const router = Router();

router.get('/check', authenticateToken , checkInventory);

export default router;