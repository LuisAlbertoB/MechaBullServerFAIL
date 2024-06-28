export class Bovino {
    readonly id:string;
    private name:string;
    private siniga:string;
    private age:number;
    private lpm:number;
    private averageSteps:number;
    private location:number;

    constructor(name:string, siniga:string, age:number,){
        this.name = name;
        this.siniga = siniga;
        this.age = age;
    }
    getName(): string {
        return this.name;
    }

}