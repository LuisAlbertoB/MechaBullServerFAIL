import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async create(username: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.checkDuplicate(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        return this.userRepository.createUser(username, email, password);
    }
}
