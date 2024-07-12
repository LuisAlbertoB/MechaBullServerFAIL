import { Lpm } from './models/lpm';

export interface LpmRepository {
    create(lpm: Lpm): Promise<Lpm>;
    get(id: string): Promise<Lpm | null>;
    update(id: string, lpm: Lpm): Promise<Lpm | null>;
    delete(id: string): Promise<void>;
}
