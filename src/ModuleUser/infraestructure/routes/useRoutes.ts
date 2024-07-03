import { Router } from 'express';
import { userController } from '../dependencies';

const userRouter = Router();

userRouter.post('/user/:email', (req, res) => userController.getUser(req, res));
userRouter.post('/user', (req, res) => userController.createUser(req, res));
userRouter.put('/user/:email', (req, res) => userController.updateUser(req, res));
userRouter.delete('/user/:email', (req, res) => userController.deleteUser(req, res));

export default userRouter;
