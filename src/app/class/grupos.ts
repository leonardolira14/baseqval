export class Grupos {
    public IDGrupo:string;
    public Nombre:string;
    public Tipo:string;
    public status:string;
    public Fecha:string;
    constructor(iD,Nombre,tipo,Status,fecha){
        this.IDGrupo=iD;
        this.Nombre=Nombre;
        this.Tipo=tipo;
        this.status=Status;
        this.Fecha=fecha;
    }
}
