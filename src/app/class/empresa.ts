import {environment} from '../../environments/environment';
export class Empresa {
    private IDEmpresa: string;
    private Rason_Social:string;
    private Nombre_Comercial:string;
    private RFC:string;
    private Tipo_Empresa:string;
    private NoEmpleados:string;
    private Facturacion_Anual:string;
    private Perfil:string;
    private CalleyNumero:string;
    private Colonia:string;
    private Logo:string;
    private Municipio:string;
    private Cp:string;
    private Estado:string;
    private Telefono:string;
    private Banner: string;
    private Paquete:string;
    constructor(id, rz, nc, rfc, tpe, ne, faca, per, calle, col, logo, mon, cp, est, tel, banner,paquete) {
        this.IDEmpresa = id;
        this.Rason_Social = rz;
        this.RFC = rfc;
        this.Nombre_Comercial = nc;
        this.NoEmpleados = ne;
        this.Tipo_Empresa = tpe;
        this.Facturacion_Anual = faca;
        this.Perfil = per;
        this.CalleyNumero = calle;
        this.Colonia = col;
        this.Logo = logo;
        this.Municipio = mon;
        this.Cp = cp;
        this.Estado = est;
        this.Telefono = tel;
        this.Banner = banner;
        this.Paquete = paquete;
    }
    getBanner() {
        return this.Banner;

    }
    updateBanner(banner) {
        this.Banner = banner;
    }
    getID() {
        return this.IDEmpresa;
    }
    getRazon() {
        return this.Rason_Social;
    }
    updateRazon(razon) {
        this.Rason_Social = razon;
    }
    getNombreC() {
        return this.Nombre_Comercial;
    }
    updateNombreC(nombre) {
        this.Nombre_Comercial = nombre;
    }
    getrfc() {
        return this.RFC;
    }
    updaterfc(rfc) {
        this.RFC = rfc;

    }
    getTipo() {
        return this.Tipo_Empresa;
    }
    updateTipo(tipo) {
        this.Tipo_Empresa = tipo;
    }
    getNoEm() {
        return this.NoEmpleados;
    }
    updateNoEm(NoE) {
        this.NoEmpleados = NoE;
    }
    getFac() {
        return this.Facturacion_Anual;
    }
    updateFac(fac) {
        this.Facturacion_Anual = fac;
    }
    getPerfil() {
        return this.Perfil;
    }
    updatePerfil(perfil) {
        this.Perfil = perfil;
    }
    getCalle() {
        return this.CalleyNumero;
    }
    updateCalle(calle) {
        this.CalleyNumero = calle;
    }
    getColonia() {
        return this.Colonia;
    }
    updateColonia(colonia) {
        this.Colonia = colonia;
    }
    getLogo() {
        return this.Logo;
    }
    updateLogo(logo) {
        this.Logo = logo;

    }
    getMun() {
        return this.Municipio;
    }
    updateMun(mun) {
        this.Municipio = mun;
    }
    getCp() {
        return this.Cp;
    }
    updateCp(cp) {
        this.Cp = cp;
    }
    getEstado() {
        return this.Estado;
    }
    updateEstado(estado) {
        this.Estado = estado;
    }
    getTelefono() {
        return this.Telefono;
    }
    updateTelefono(tele) {
        this.Telefono = tele;
    }
    getpaquete() {
        return this.Paquete;
    }
    updatepaquete(paquete){
        this.Paquete = paquete;
    }

}
