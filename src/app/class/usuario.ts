export class Usuario {
    private nombre:string;
    private apellido:string;
    private empresa:string;
    private Puesto:string;
    private Config:string;
    private Usuario:string;
    private Correo:string;
    private funciones:any;
    private Id:string;
    constructor(id:string,nombre:string,apellido:string,empresa:string,puesto:string,config:string,usuario:string,correo:string,funciones:any){
        this.Id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.empresa=empresa;
        this.Puesto=puesto;
        this.Config=config;
        this.Usuario=usuario;
        this.Correo=correo;
        this.funciones=funciones;
    } 
    getId(){
        return this.Id;
    }
    getNombre(){
        return this.nombre;
    }
    updateNombre(nombre){
        this.nombre=nombre;
    }
    getApellido(){
        return this.apellido;
    }
    updateApellido(apellido){
        this.apellido=apellido;
    }
    getEmpresa(){
        return this.empresa;
    }
    getPuesto(){
        return this.Puesto;
    }
    updatePuesto(puesto){
        this.Puesto=puesto;
    }
     getConfig(){
        return this.Config;
    }
    updateConfig(config){
        this.Config=config;
    }
   getUsuario(){
        return this.Usuario;
    }
    updateUsuario(usuario){
        this.Usuario=usuario;
    }
    getCorreo(){
        return this.Correo;
    }
    updateCorreo(correo){
        this.Correo=correo;
    }
    getfunciones(){
        return JSON.parse(this.funciones);
    }
    updateFunciones(func){
        this.funciones=func;
    }

}
