import { Model } from 'mongoose';

interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

interface TAddress {
  street: string;
  city: string;
  country: string;
}

interface TFullName {
  firstName: string;
  lastName: string;
}

interface TUser {
  userId: string;
  username: string;
  password: string; // This would ideally be a hashed string, but for simplicity, it's represented as a string here.
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrder[];
}

interface TUserModel extends Model<TUser> {
  isUserExist: (id: string) => Promise<TUser>;
}

export { TUser, TOrder, TAddress, TFullName, TUserModel };
