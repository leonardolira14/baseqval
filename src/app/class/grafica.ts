export class GraficaData{

    private label:string[] =["Enero","Febrero","Marzo"];
    private valores:number[]=[0,0,0];

    constructor(){
        
    }
    getDataGrafica(){
        return {data:this.valores,label:"# de veces realizado el cuestioario"}
    }
    updatevalores(valores){
        this.valores=valores;
        this.getDataGrafica();
    }

}