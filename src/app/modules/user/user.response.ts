import { TUser } from './user.interface';
export const formatResponse = (user: TUser) => {
  return {
    success: true,
    message: 'User created successfully!',
    data: {
      userId: user.userId,
      username: user.username,
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      age: user.age,
      email: user.email,
      isActive: user.isActive,
      hobbies: user.hobbies,
      address: {
        street: user.address.street,
        city: user.address.city,
        country: user.address.country,
      },
    },
  };
};
