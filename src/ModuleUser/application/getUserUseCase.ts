import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.getUserByEmail(email);
    }
}
