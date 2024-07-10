import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/createUserUseCase";
import { GetUserUseCase } from "../../application/getUserUseCase";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";
import { generarToken } from "../auth/tokenManager";


export class UserController {
    constructor(
        private getUserUseCase: GetUserUseCase,
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase

        
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(406).json({ message: "campos requeridos" });
            return;
        }
        try {
            const userData = await this.getUserUseCase.getUserByEmail(username, password);
            if (userData) {
                const token = await generarToken(userData.id, userData.username);
                res.status(200).json({token: token});
                return;
            }
        } catch (error: any) {
            if(error.message === 'error-find-or-password'){
                res.status(404).json({ message: "email-password-incorrect" });
                return;
            }
            res.status(500).json({ message: "Internal server error", error });
            return;
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(406).json({ message: "All fields are required" });
            return;
        }
        try {
            const newUser = await this.createUserUseCase.create(username, email, password);
            res.status(201).json(newUser);
        } catch (error: any) {
            if (error.message === 'User already exists') {
                res.status(409).json({ message: "User already exists" });
            } else {
                res.status(500).json({ message: "Internal server error", error });
            }
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const email = req.params.email;
        const updateData = req.body;
        if (!email || !updateData) {
            res.status(406).json({ message: "Fields are required" });
            return;
        }
        try {
            const updatedUser = await this.updateUserUseCase.update(email, updateData);
            res.status(200).json({
                user: updatedUser,
                message: "User updated successfully"
            });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const email = req.params.email;
        if (!email) {
            res.status(406).json({ message: "Email is required" });
            return;
        }
        try {
            await this.deleteUserUseCase.delete(email);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}
