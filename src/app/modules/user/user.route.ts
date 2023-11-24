import express from 'express';
import { createUser,getAllUsers, getUserById   } from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);

router.post('/create', createUser);

router.get('/:userId', getUserById);


export const userRouter = router;
