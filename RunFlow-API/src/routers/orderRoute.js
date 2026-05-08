import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';

const router = Router();

router.post('/createOrder', orderController.createOrder); 
router.get('/:id', orderController.getOrderById);

export default router;