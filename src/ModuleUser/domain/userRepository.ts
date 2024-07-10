import { User } from './user';
import { UpdateUserData } from './types/typeUser';

export interface UserRepository {
    getAllUsers(): Promise<User[] | null>;
    getUserByUsername(username: string, password:string): Promise<User | null>;
    createUser(username: string, email: string, password: string): Promise<User>;
    checkDuplicate(email: string): Promise<User | null>;
    updateUser(email: string, updateData: UpdateUserData): Promise<User | null>;
    deleteUser(email: string): Promise<void>;
}