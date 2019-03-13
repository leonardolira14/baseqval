import { Cuestionarios } from './cuestionarios';

export class CuestionariosList {
    public  lista:Cuestionarios[]=[];
    constructor(){  }

    public getlist(){
        return this.lista;
    }
    public addcuestionario(cuestionario){
        this.lista.push(cuestionario);
    }
    public busquedapalabra(palabra){
        return this.lista.filter(cuestion=>cuestion.Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getcuestonario(id){
        let result;
        this.lista.forEach((cuestion)=>{
            if(cuestion.IDCuestionario==id){
                result=cuestion;
            }
        })
        return result;
    }
}
