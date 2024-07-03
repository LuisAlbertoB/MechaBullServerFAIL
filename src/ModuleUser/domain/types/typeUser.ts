import { User } from '../user';

export type UpdateUserData = Partial<Omit<User, 'email'>>;
