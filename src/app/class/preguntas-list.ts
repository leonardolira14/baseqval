import { Preguntas } from './Preguntas';
export class PreguntasList {
    public list:Preguntas[]=[];
    constructor(){

    }
    getlist(){
        return this.list;
    }
    clearlist(){
        this.list=[];
    }
    addask(ask:Preguntas){
        this.list.push(ask);
    }
    busquedapalabra(palabra:string){
        return this.list.filter(preg=>preg.Pregunta.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    busquedapregunta(id){
        let datos;
        this.list.forEach((reps)=>{
            if(reps.IDPregunta===id){
                datos=reps;
            }
        })
        return datos;
    }
}
