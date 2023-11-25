import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  TUserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const OrderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserSchema = new Schema<TUser, TUserModel>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This would ideally be a hashed string, but for simplicity, it's represented as a string here.
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: { type: AddressSchema, required: true },
  orders: [OrderSchema],
});

UserSchema.pre<TUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.password) return next();
  const salt = await bcrypt.genSalt(Number(config.salt_rounds));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.statics.isUserExist = async function (id: string) {
  const user = await UserModel.findOne({ userId: id });
  return user;
};

const UserModel = model<TUser, TUserModel>('user', UserSchema);

export default UserModel;
