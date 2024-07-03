import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/createUserUseCase";
import { GetUserUseCase } from "../../application/getUserUseCase";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";

export class UserController {
    constructor(
        private getUserUseCase: GetUserUseCase,
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async getUser(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        if (!email) {
            res.status(406).json({ message: "Email is required" });
            return;
        }
        try {
            const user = await this.getUserUseCase.getUserByEmail(email);
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: "Internal server error", error });
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
