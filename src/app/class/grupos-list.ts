import { Grupos} from './grupos';


export class GruposList {
    private lista:Grupos[]=[];
    constructor(){

    } 
    public limpiarlista(){
        this.lista=[];
    }
    public agregarGrupo(Grupo:Grupos){
        this.lista.push(Grupo);
        return Grupo;
    }
    public actualizarNombre(IDGrupo:string,nombre:string){
        this.lista.forEach((grupo)=>{
            if(grupo.IDGrupo ===IDGrupo){
                grupo.Nombre=nombre;
              return;
            }
        })
        return this.lista;
    } 
    public busquedapalabra(palabra){
        return this.lista.filter(grupo=>grupo.Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
       // return Observable.of(this.lista);
    }
    public getGrupo(IDGrupo:string){
         let datos:any;
            this.lista.forEach((elem)=>{
                if(IDGrupo===elem.IDGrupo){
                    datos=elem;
                }
            })
            return datos;
        //return this.lista.find(grupo=>grupo.IDGrupo==IDGrupo);
    }
    public deleteGrupo(IDGrupo:string){
        const tempUsuario=this.getGrupo(IDGrupo);
        this.lista=this.lista.filter(usuario=>usuario.IDGrupo!==IDGrupo);
        return tempUsuario;
    }
}
