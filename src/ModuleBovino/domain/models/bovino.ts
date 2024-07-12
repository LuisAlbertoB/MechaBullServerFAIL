export class Bovino {
    readonly id:string;
    private name:string;
    private siniga:string;
    private age:number;


    constructor(id: string, name:string, siniga:string, age:number,){
        this.id = id;
        this.name = name;
        this.siniga = siniga;
        this.age = age;
    }

    public getIdBovino(): { id: string} {
        return {
          id: this.id,
        };
    }
}