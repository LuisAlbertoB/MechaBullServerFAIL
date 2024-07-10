import { Router } from 'express';
import { userController } from '../dependencies';

const userRouter = Router();

userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/create', (req, res) => userController.createUser(req, res));
userRouter.put('/update-data/:email', (req, res) => userController.updateUser(req, res));
userRouter.delete('/delete/:email', (req, res) => userController.deleteUser(req, res));

export default userRouter;
