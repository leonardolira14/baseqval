export class Usuario {
    private nombre: string;
    private apellido: string;
    private empresa: string;
    private Puesto: string;
    private Config: string;
    private Usuario: string;
    private Correo: string;
    private Id: any;
    private funciones: any;
    private Imagen: string;
    private Celular:string;
    constructor(
        id: string,
        nombre: string,
        apellido: string,
        empresa: string,
        puesto: string,
        config: string,
        usuario: string,
        correo: string,
        funciones: any,
        Imagen: any,
        Celular: any
        ) {
        this.Id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.Puesto = puesto;
        this.Config = config;
        this.Usuario = usuario;
        this.Correo = correo;
        this.funciones = funciones;
        this.Imagen = Imagen;
        this.Celular = Celular;
    }
    getAvatar() {
        return this.Imagen;
    }
    update_avatar(Imagen) {
        this.Imagen = Imagen;
    }
    getId() {
        return this.Id;
    }
    getNombre() {
        return this.nombre;
    }
    updateNombre(nombre) {
        this.nombre = nombre;
    }
    getApellido() {
        return this.apellido;
    }
    updateApellido(apellido) {
        this.apellido = apellido;
    }
    getEmpresa() {
        return this.empresa;
    }
    getPuesto() {
        return this.Puesto;
    }
    updatePuesto(puesto) {
        this.Puesto = puesto;
    }
     getConfig() {
        return this.Config;
    }
    updateConfig(config) {
        this.Config = config;
    }
   getUsuario() {
        return this.Usuario;
    }
    updateUsuario(usuario) {
        this.Usuario = usuario;
    }
    getCorreo() {
        return this.Correo;
    }
    getCelular(){
        return this.Celular;
    }
    updateCelular(celular){
        this.Celular = celular;
    }
    updateCorreo(correo) {
        this.Correo = correo;
    }
    getfunciones() {
        return JSON.parse(this.funciones);
    }
    updateFunciones(func) {
        this.funciones = func;
    }

}
