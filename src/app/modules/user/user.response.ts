import { TUser, TOrder } from './user.interface';

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
      orders: user.orders.map((order) => {
        return {
          productName: order.productName,
          price: order.price,
          quantity: order.quantity,
        };
      }),
    },
  };
};

// get all users

const getAllUserFormatResponse = (users: TUser[], msg?: string) => {
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
};

const getAllOrdersOfUserByIdFormatResponse = (
  orders: TOrder[],
  msg?: string,
) => {
  return {
    success: true,
    message: msg ?? 'Orders fetched successfully!',
    data: {
      orders: orders.map((order) => {
        return {
          productName: order.productName,
          price: order.price,
          quantity: order.quantity,
        };
      }),
    },
  };
};

export {
  formatResponse,
  getAllUserFormatResponse,
  getAllOrdersOfUserByIdFormatResponse,
};
