import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteInterface } from '../../models/cliente-interface';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import {ClientesList } from '../../class/clientes-list';
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-cclientes',
  templateUrl: './cclientes.component.html',
  styleUrls: ['./cclientes.component.scss']
})
export class CclientesComponent implements OnInit {
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorralert') private errorralert: SwalComponent;
  @ViewChild('modalclint') private modalclint;
public palabra: string;
pageActual = 1;
closeResult: string;
datosusuario: any[] = JSON.parse(localStorage.usuarioqval);
funcionesusuario: any[] = [];
ruta_server = environment.urlserverp;
logo_avatar: any = 'assets/img/avatar1.png';
public imagePath;
public datsclie = false;
spiner = false;
file_avatar: File = null;
public clientes = new ClientesList();
public cliente: ClienteInterface = {
  IDCliente: '',
  Nombre: '',
  RFC: '',
  Usuario: '',
  Pais: '',
  Municipio: '',
  Direccion: '',
  Puesto: '',
  Tel: '',
  NombreComercial: '',
  EEstado: '',
  Correo: '',
  Actipass: '',
  IDConfig: '',
  Estado: '',
  TPersona: '',
  Apellidos: '',
  IDEmpresa: '',
  Telcontact: '',
  Imagen: ''
};
alertterror: string;
staticAlertClosed = false;
public Listclientes: any[] = [];
public codeqr: string;
public datos_empresa;
public estados: any[] = [];
public grupos: any[] = [];
public deleteclientid = '';
public selected: any;
public remoto = true;
  constructor(
    public http: ClientesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {
    this.datos_empresa = JSON.parse(localStorage.empresa);
    this.funcionesusuario = JSON.parse(this.datosusuario['funciones']);
    this.general();
   }

   general() {

    this.http.getgeneral(this.datos_empresa['IDEmpresa'])
    .subscribe((resp) => {
      this.estados = resp['estados'];
      this.grupos = resp['externos'];
    });
   }
  ngOnInit() {
    this.spiner = true;
    this.http.getall(this.datos_empresa['IDEmpresa'])
    .subscribe((resp) => {
      if (resp['ok'] !== false) {
        this.clientes.limpiarlista();
        resp['ok'].forEach(element => {
          this.clientes.addcliente(element);
        });

      }
     this.Listclientes = this.clientes.getList();
      console.log(this.Listclientes);
      this.spiner = false;
    }, (error) => {
      this.spiner = false;
      console.log(error);
    });
  }

  buscarcliente() {
    this.Listclientes = this.clientes.buscarpalabra(this.palabra);
  }

  add(modal) {
  }
  export() {
  }
  qr(moda, usuario) {

    this.codeqr = usuario;
    this.modalService.open(moda, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  open() {
    if (this.funcionesusuario[4] === '0') {
      this.errorralert.show();
      return;
    }
    this.cliente.Apellidos = '';
    this.cliente.Imagen = '';
    this.cliente.Correo = '';
    this.cliente.Direccion = '';
    this.cliente.EEstado = '';
    this.cliente.Estado = '1';
    this.cliente.IDCliente = '';
    this.cliente.IDConfig = '';
    this.cliente.IDEmpresa = this.datos_empresa['IDEmpresa'];
    this.cliente.Municipio = '';
    this.cliente.Nombre = '';
    this.cliente.NombreComercial = '';
    this.cliente.Pais = '';
    this.cliente.Puesto = '';
    this.cliente.RFC = '';
    this.cliente.TPersona = 'PFA';
    this.cliente.Tel = '';
    this.cliente.Usuario = '';
    this.cliente.Actipass = '1';
    this.cliente.Telcontact = '';
    this.datsclie = true;


  }
  // funcion para solicitar datos de un cliente
    requestuser(id) {
       if (this.funcionesusuario[4] === '0') {
      this.errorralert.show();
      return;
    }
       this.spiner = true;
      this.http.getuser(id)
      .subscribe((resp) => {
        this.spiner = false;
        resp['ok'] !== false ? this.cliente = resp['ok'] : '';
        console.log(this.cliente.Imagen);
        (this.cliente.Imagen == null || this.cliente.Imagen === '') ? this.logo_avatar = 'assets/img/avatar1.png' : this.logo_avatar = this.ruta_server + 'assets/img/clientes/avatar/' + this.cliente.Imagen;
        this.datsclie = true;
        this.spiner = false;
      }, (error) => {
         this.spiner = false;
        console.log(error);
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  // funcion para dar de baja un cliente
  delete(Id, stado) {
     if (this.funcionesusuario[4] === '0') {
      this.errorralert.show();
      return;
    }
    console.log(Id, stado);
    this.spiner = true;
    this.http.update_status(Id, stado)
    .subscribe((resp) => {
      this.ngOnInit();
    });
  }
  enviarform() {
     if (this.funcionesusuario[4] === '0') {
        this.errorralert.show();
        return;
      }
    const  formData = new FormData;
    if (this.cliente.IDCliente !== '') {
      if (this.cliente['Nombre'] === undefined || this.cliente['Nombre'] === '') {
        swal('Error!', 'Ingresa una Razon Social', 'error');
        return ;
      }
      if (this.remoto === true && this.cliente.Telcontact === null) {
        console.log(this.cliente.Telcontact)
        swal('Error!', 'Ingresa un número de celular para poder mandar mensajes de texto.', 'error');
        return ;
      }
      formData.append('datos', JSON.stringify(this.cliente));
      if (this.file_avatar !== null) {
        formData.append('Imagen', this.file_avatar, this.file_avatar.name);
      }
      this.spiner = true;
      this.http.update(formData)
      .subscribe((resp) => {
        this.spiner = false;
        this.datsclie = false;
        this.logo_avatar = 'assets/img/avatar1.png';
        swal('Exito!', 'Datos Actualizados...', 'success');
        this.ngOnInit();
      });
    } else {
      if (this.cliente['Nombre'] === undefined || this.cliente['Nombre'] === '') {
        swal('Error!', 'Ingresa una Razon Social', 'error');
        return ;
      }
      this.spiner = true;
      this.cliente.IDEmpresa = this.datos_empresa['IDEmpresa'];
      formData.append('datos', JSON.stringify(this.cliente));
      if (this.file_avatar !== null) {
        formData.append('Imagen', this.file_avatar, this.file_avatar.name);
      }
      this.http.save(formData)
      .subscribe(() => {
        this.spiner = false;
        this.datsclie = false;
        this.logo_avatar = 'assets/img/avatar1.png';
        swal('Exito!', 'Datos Actualizados...', 'success');
          this.ngOnInit();
      });
    }
    this.datsclie = false;
  }
  closemodel(content) {
    this.modalService.dismissAll(content);
  }
  close() {
     this.staticAlertClosed = false;
  }
  alertdele(id) {
     if (this.funcionesusuario[4] === '0') {
      this.errorralert.show();
      return;
    }
    this.spiner = true;
    const datos = {IDCliente: id};
    this.http.numregistros_clie(datos)
    .subscribe((data) => {
      console.log(data['ok']);
      this.errorrfcSwal.text = 'Se eliminaran todos los resultados relacionados con este cliente/proveedor, realizados y recibidos, total de Registros: ' + data['ok'] + '.';
      this.spiner = false;
      this.deleteclientid = id;
       this.errorrfcSwal.show();
    });

  }
  borrarcliente() {
     if (this.funcionesusuario[4] === '0') {
      this.errorralert.show();
      return;
    }
    this.spiner = true;
    const datos = {IDCliente: this.deleteclientid};
    this.http.delete(datos)
    .subscribe((data) => {
      this.ngOnInit();
    });
  }
  change_img_avatar(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      swal('Error!', 'Archivo no soportado', 'error');
      return;
    }
    this.file_avatar = <File>files[0];
    this.cliente.Imagen = this.file_avatar.name;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logo_avatar = reader.result;
    };
  }
  selec_grupo(idGrupo) {
    let nombre_grupo = '';
    this.grupos.forEach(grupo => {
      if (grupo.IDGrupo === idGrupo) {
        nombre_grupo = grupo.Nombre;
        return ;
      }
    });
    return nombre_grupo;
  }
  filtrogrupo() {
    this.Listclientes = this.clientes.buscar_grupo(this.selected);
  }
}
