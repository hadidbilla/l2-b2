import express from 'express';
import { createUser,getAllUsers, getUserById, updateUserById, deleteUserById, createOrder, getAllOrdersOfUserById,calculateTotalPriceOfOrders  } from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);

router.post('/create', createUser);

router.get('/:userId', getUserById);

router.put('/:userId', updateUserById);

router.delete('/:userId', deleteUserById);

router.put('/:userId/orders', createOrder);

router.get('/:userId/orders', getAllOrdersOfUserById);

router.get('/:userId/orders/total-price', calculateTotalPriceOfOrders);


export const userRouter = router;
