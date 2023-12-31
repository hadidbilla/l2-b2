import { TUser, TOrder } from './user.interface';
import UserModel from './user.model';

//create user
const createUserService = async (userData: TUser) => {
  if (await UserModel.isUserExist(userData.userId)) {
    throw new Error('User already exists');
  }
  const user = await UserModel.create(userData);
  return user;
};

//get all users
const getAllUsersService = async () => {
  const users = await UserModel.find();
  return users;
};

//get user by id
const getUserByIdService = async (userId: string) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

//update user
const updateUserByIdService = async (userId: string, userData: TUser) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not found');
  }

  const updatedUser = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
  });
  return updatedUser;
};

//delete user
const deleteUserByIdService = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not found');
  }
  const deletedUser = await UserModel.findOneAndDelete({ userId });
  return deletedUser;
};

//add order to user by id
const addOrderToUserByIdService = async (userId: string, order: TOrder) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not found');
  }
  const orderUpdated = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { new: true },
  );
  return orderUpdated;
};

//get all orders of user by id
const getAllOrdersOfUserByIdService = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not found');
  }
  const order = await UserModel.findOne({ userId }).populate('orders');
  return order;
};

//Calculate Total Price of Orders for a Specific User
const calculateTotalPriceOfOrdersService = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not found');
  }

  const totalPrice = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    { $group: { _id: '$userId', totalPrice: { $sum: '$orders.price' } } },
  ]);
  return totalPrice[0].totalPrice;
};

export {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  addOrderToUserByIdService,
  getAllOrdersOfUserByIdService,
  calculateTotalPriceOfOrdersService,
};
