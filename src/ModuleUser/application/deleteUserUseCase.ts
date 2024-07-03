import { UserRepository } from '../domain/userRepository';

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async delete(email: string): Promise<void> {
        await this.userRepository.deleteUser(email);
    }
}
