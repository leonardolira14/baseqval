import { Usuariosplus } from './usuariosplus';
export class UsuariosList {
    private listusuarios: Usuariosplus[] = [];

    constructor() {

    }
    public limpiar_lista() {
        this.listusuarios = [];
    }
    public addusuario( usuario) {
        this.listusuarios.push(usuario);
        return usuario;
    }
    public buscqueda_palabra(palabra: string) {
        return this.listusuarios.filter(usuario => usuario.Nombre.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
    }
    public getLista() {
        return this.listusuarios;
    }
    public getUsuario(ID: string) {
        let datos: any;
           this.listusuarios.forEach((elem) => {
               if (ID === elem.IDUsuario) {
                   datos = elem;
               }
           });
           return datos;
   }
}
