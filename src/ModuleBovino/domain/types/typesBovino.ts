import { Bovino } from "../bovino";

export type UpdateBovinoData = Partial<Omit<Bovino, 'name' | 'siniga' | 'age'>>;
