import { Bovino } from './bovino'

export interface BovinoRepository {
    createBovino(bovinoName: string, bovinoSiniga: string, bovinoAge: number): Promise<Bovino>;
    //getBovino(bovinoID: number, bovinoName: string, bovinoSiniga: string, bovinoAge: number, bovinoLPM: number, bovinoAverage: number, bovinoLocation: number): Promise<Bovino> | null;
}