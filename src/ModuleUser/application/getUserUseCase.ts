import { UserRepository } from '../domain/userRepository';

export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async getUserByEmail(username: string, password:string): Promise<{ id: string, username: string } | null> {
        const getUser = await this.userRepository.getUserByUsername(username, password);
        if (!getUser) {
            throw new Error("error-find-or-password");
        }  
        return getUser.getPublicUserData(); 
    }

}
