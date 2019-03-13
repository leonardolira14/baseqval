

export class Usuarios {
    public nombre:string;
    public apellido:string;
    public empresa:string;
    public Puesto:string;
    public Config:string;
    public Usuario:string;
    public Correo:string;
    public funciones:any;
    public Id:string;
    public Estado:string;
    
    constructor(ID:string,Nombre:string,Apellidios:string,Empresa:string,Puesto:string,Usuario:string,Correo:string,Funciones:any,Config:string,Estado:string){
        this.Id=ID;
        this.nombre=Nombre;
        this.apellido=Apellidios;
        this.empresa=Empresa;
        this.Puesto=Puesto;
        this.Usuario=Usuario;
        this.Correo=Correo;
        this.funciones=Funciones;
        this.Config=Config;
        this.Estado=Estado;
    }

}
