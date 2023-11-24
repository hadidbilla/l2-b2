import { Request, Response } from 'express';
import { createUserService,getAllUsersService, getUserByIdService } from './user.service';
import { formatResponse, getAllUserFormatResponse } from './user.response';
import userValidateSchema from './user.joi.validation';

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
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    console.log('users', users);
    if (!users.length) {
      return res.status(404).json({ error: 'No Users found' });
    } else {
      const response = getAllUserFormatResponse(users);
      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService(userId);
    if (!user) {
      return res.status(404).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    } else {
      const response = formatResponse(user, 'User fetched successfully!');
      res.status(200).json(response);
    }
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message });
  }
}

export { createUser, getAllUsers, getUserById };
