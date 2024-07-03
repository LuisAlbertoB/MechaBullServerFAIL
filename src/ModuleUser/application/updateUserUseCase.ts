import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';
import { UpdateUserData } from '../domain/types/typeUser';

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async update(email: string, updateData: UpdateUserData): Promise<User | null> {
        return this.userRepository.updateUser(email, updateData);
    }
}
