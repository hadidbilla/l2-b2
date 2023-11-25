import { Request, Response } from 'express';
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  addOrderToUserByIdService,
  getAllOrdersOfUserByIdService,
  calculateTotalPriceOfOrdersService,
} from './user.service';
import {
  formatResponse,
  getAllUserFormatResponse,
  getAllOrdersOfUserByIdFormatResponse,
} from './user.response';
import { userValidateSchema, orderValidateSchema } from './user.joi.validation';

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { error } = userValidateSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }

    const user = await createUserService(req.body);

    const response = formatResponse(user);
    res.status(201).json(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    if (!users.length) {
      return res.status(404).json({ error: 'No Users found' });
    } else {
      const response = getAllUserFormatResponse(users);
      res.status(200).json(response);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      const response = formatResponse(user, 'User fetched successfully!');
      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

//update user
const updateUserById = async (req: Request, res: Response) => {
  try {
    const { error } = userValidateSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }

    const { userId } = req.params;

    const user = await updateUserByIdService(userId, req.body);

    if (user) {
      const response = formatResponse(user, 'User updated successfully!');
      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

//delete user
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await deleteUserByIdService(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = orderValidateSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }

    const { userId } = req.params;
    const orderData = req.body;
    const order = await addOrderToUserByIdService(userId, orderData);
    console.log('order', order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

// get all orders of user by id
const getAllOrdersOfUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = await getAllOrdersOfUserByIdService(userId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: {
          code: 404,
          description: 'Order not found!',
        },
      });
    } else {
      const response = getAllOrdersOfUserByIdFormatResponse(order.orders);
      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await calculateTotalPriceOfOrdersService(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createOrder,
  getAllOrdersOfUserById,
  calculateTotalPriceOfOrders,
};
