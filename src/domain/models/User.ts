export class User{
    constructor(
        public id: string,
        public name: string,
        public score: number = 0,
        public level: number = 1,
        public lives: number = 3
      ) {}
}