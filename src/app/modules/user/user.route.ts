import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/create', userController.createUser);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserById);

router.put('/:userId/orders', userController.createOrder);

router.get('/:userId/orders', userController.getAllOrdersOfUserById);

router.get(
  '/:userId/orders/total-price',
  userController.calculateTotalPriceOfOrders,
);

export const userRouter = router;
