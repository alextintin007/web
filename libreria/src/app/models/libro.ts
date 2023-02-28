export class Libro{
    constructor(
        public _id:string,
        public nombre:string,
        public autor:string,
        public edicion:string,
        public anio:Number,
        public precio:Number,
        public imagen:string
    ){}
}