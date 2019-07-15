import { Usuarios } from './usuarios';
export class UsuariosList {
    private lista: Usuarios[] = [];
    constructor() {

    }
    public limpiarlista() {
        this.lista = [];
    }
    public agregarUsuario(Usuario: Usuarios) {
        this.lista.push(Usuario);
        return Usuario;
    }
    public busquedapalabra(palabra: string) {
        // console.log(this.lista);

        return this.lista.filter(usuario => usuario.Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.lista;
    }
    public getUsuario(ID: string) {
        let datos: any;
           this.lista.forEach((elem) => {
               if (ID === elem.ID) {
                   datos = elem;
               }
           });
           return datos;
       // return this.lista.find(grupo=>grupo.IDGrupo==IDGrupo);
   }
   public getFunciones(id) {
       let funciones = '';
       this.lista.forEach((usuario) => {
           if (usuario.ID === id) {
            funciones = usuario.Funciones;
           }

       });
    return funciones;
   }
   public buscar_grupo(grupo) {
       
    const listic = [];
    if (grupo === 'td') {
        return this.lista;
    } else if (grupo === 'sn') {
        this.lista.forEach(cliente => {
            if (cliente.IDConfig === '0') {
                listic.push(cliente);
            }
         });
         return listic;
    } else {

       this.lista.forEach(cliente => {
           if (cliente.IDConfig === grupo) {
            listic.push(cliente);
           }

        });
        return listic;
    }
}

}
