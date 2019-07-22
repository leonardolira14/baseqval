export class Grupos {
    public IDGrupo: string;
    public Nombre: string;
    public Tipo: string;
    public status: string;
    public Fecha: string;
    public NoMiembros: string;
    constructor(iD, Nombre, tipo, Status, fecha, miembros) {
        this.IDGrupo = iD;
        this.Nombre = Nombre;
        this.Tipo = tipo;
        this.status = Status;
        this.Fecha = fecha;
        this.NoMiembros = miembros;
    }
}
