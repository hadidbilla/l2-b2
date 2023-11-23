import { TUser } from './user.interface';
import UserModel from './user.model';

const createUserService = async (userData: TUser) => {
  if (await UserModel.isUserExist(userData.userId)) {
    throw new Error('User already exists');
  }
  const user = await UserModel.create(userData);
  return user;
};

export { createUserService };
