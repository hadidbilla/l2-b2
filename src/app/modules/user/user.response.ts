import { TUser } from './user.interface';

const formatResponse = (user: TUser, msg?: string) => {
  return {
    success: true,
    message: msg ?? 'User created successfully!',
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

// get all users

const getAllUserFormatResponse = (users: TUser[], msg?:string) => {
  return {
    success: true,
    message: msg ?? 'Users fetched successfully!',
    data: users.map((user) => {
      return {
        username: user.username,
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName.lastName,
        },
        age: user.age,
        email: user.email,
        address: {
          street: user.address.street,
          city: user.address.city,
          country: user.address.country,
        },
      };
    }),
  };
}

export { formatResponse, getAllUserFormatResponse };