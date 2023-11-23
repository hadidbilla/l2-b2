import { Request, Response } from 'express';
import { createUserService } from './user.service';
import { formatResponse } from './user.response';
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

export { createUser };
