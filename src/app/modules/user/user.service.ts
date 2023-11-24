import { TUser } from './user.interface';
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
}

export { createUserService, getAllUsersService, getUserByIdService };
