import { Usuarios } from './usuarios';
export class UsuariosList {
    private lista:Usuarios[]=[];
    constructor(){

    }
    public limpiarlista(){
        this.lista=[];
    }
    public agregarUsuario(Usuario:Usuarios){
        this.lista.push(Usuario);
        return Usuario;
    }
    public busquedapalabra(palabra:string){
        //console.log(this.lista);
        
        return this.lista.filter(usuario=>usuario.nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
    }
    public getUsuario(ID:string){
        let datos:any;
           this.lista.forEach((elem)=>{
               if(ID===elem.Id){
                   datos=elem;
               }
           })
           return datos;
       //return this.lista.find(grupo=>grupo.IDGrupo==IDGrupo);
   }
   public getFunciones(id){
       var funciones="";
       this.lista.forEach((usuario)=>{
           if(usuario.Id===id){
            funciones=usuario.funciones;
           }
        
       })
    return funciones;
   }

}
