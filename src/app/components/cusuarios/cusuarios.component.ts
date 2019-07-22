import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosList } from '../../class/usuarios-list';
import { userInterface } from '../../models/user-interface';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2';



@Component({
  selector: 'app-cusuarios',
  templateUrl: './cusuarios.component.html',
  styleUrls: ['./cusuarios.component.scss']
})
export class CusuariosComponent implements OnInit {
   @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
    @ViewChild('errorralert') private errorralert: SwalComponent;
  ruta_server = environment.urlserverp;
  closeResult: string;
  datosempresa: any[] = [];
  pageActual = 1;
  palabra = '';
  listausuarios: any[] = [];
  formdatsu: FormGroup;
  fexpres: any;
  fresultados: any;
  fcuestionarios: any;
  fclientes: any;
  fusarios: any;
  fgrupos: any;
  fdatos: any;
  fcalifica: any;
  form: FormGroup;
  usuariofun: string;
  alerttsucces: string;
  alertterror: string;
  datosusuario: any[] = JSON.parse(localStorage.usuarioqval);
  funcionesusuario: any[] = [];
  staticAlertClosed = false;
  codeqr = '';
  public  numregostris: any;
  public model_transfiere = false;
  deleteuserid = '';
  spiner = true;
  datsus = false;
  logo_avatar: any = 'assets/img/avatar1.png';
  public imagePath;
  public ID_Transfiere;
  public ID_Transfiere_a;
  file_avatar: File = null;
  public grupos: any[] = [];
  public user: userInterface = {
    Id: '',
    Nombre: '',
    Apellidos: '',
    Correo: '',
    Usuario: '',
    Puesto: '',
    Empresa: '',
    IDConfig: '',
    functions: '',
    Imagen: '',
    Celular: ''
  };
  orderForm: FormGroup;
  public  ListaUsuarios = new UsuariosList();
  public orders = [
    { id: 0, label: 'Calificar en Qval', name: 'fcalifica', checado: false },
    { id: 1, label: 'Configuración de datos de empresa', name: 'fdatos', checado: false  },
    { id: 2, label: 'Acciones dentro de Grupos', name: 'fgrupos', checado: false  },
    { id: 3, label: 'Acciones dentro de Usuarios' , name: 'fusarios', checado: false },
    { id: 4, label: 'Acciones dentro de Clientes', name: 'fclientes', checado: false  },
    { id: 4, label: 'Acciones dentro de  Informes', name: 'finformes', checado: false  },
    { id: 5, label: 'Acciones dentro de Cuestionarios', name: 'fcuestionarios', checado: false  },
    { id: 6, label: 'Acciones dentro de Resultados', name: 'fresultados', checado: false  },
    { id: 7, label: 'Carga Exprés', name: 'fexpres' , checado: false }
  ];
  public selected: any;
  constructor(
    private http: UsuariosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {
    this.datosempresa = JSON.parse(localStorage.empresa);
    this.funcionesusuario = JSON.parse(this.datosusuario['funciones']);
    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true);
    this.form = this.formBuilder.group({
      orders: new FormArray(controls)
    });
  }

  ngOnInit() {
    this.spiner = true;
    this.http.getall(this.datosempresa['IDEmpresa'])
    .subscribe((pass) => {
      if (pass['usuarios'] !== false) {
        this.ListaUsuarios.limpiarlista();
        pass['usuarios'].forEach(usuario => {
        this.ListaUsuarios.agregarUsuario(usuario);
        });
      }
      this.listausuarios = this.ListaUsuarios.getLista();
      console.log(this.listausuarios);
      if (pass['grupos'] !== false) {
        console.log(pass['grupos']);
              this.grupos = pass['grupos'];
      }
      this.spiner = false;
    }, (error) => {
      this.spiner = false;
    });
  }

  buscarusuario() {
    this.listausuarios = this.ListaUsuarios.busquedapalabra(this.palabra);
  }
  enviarform() {
    const formData = new FormData();
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
   // this.spiner = true;
    if (this.user.Id === '') {
      this.user.Empresa = this.datosempresa['IDEmpresa'];
      this.user.Usuario = this.user.Correo;
      formData.append('datos', JSON.stringify(this.user));
      if (this.file_avatar !== null) {
        formData.append('Imagen', this.file_avatar, this.file_avatar.name);
      }
      this.http.saveUser(formData)
      .subscribe((resp) => {
        if (resp['ok'] === null) {
          this.datsus = false;
          this.ngOnInit();
        } else {
          console.log(resp['ok']);
        }

      });
    } else {
      this.spiner = true;
      this.user.Usuario = this.user.Correo;
      formData.append('datos', JSON.stringify(this.user));
      if (this.file_avatar !== null) {
        formData.append('Imagen', this.file_avatar, this.file_avatar.name);
      }
      this.http.update(formData)
      .subscribe((resp) => {
        if (resp['ok'] === true) {
          this.datsus = false;
          this.ngOnInit();
        }
      });
    }
  }

  export() {

  }
  addfunciones(id, modal) {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }    let funciones: any = this.ListaUsuarios.getFunciones(id);
    this.usuariofun = id;
    let bandera;
    if (funciones !== '') {
      funciones = JSON.parse(funciones);
      funciones.forEach((funcion, i) => {
        funcion === '1' ?  bandera = true : bandera = false;
        this.orders[i]['checado'] = bandera;

    });
    }

    // console.log(funciones);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  qr(moda, usuario) {

    this.codeqr = usuario;
    this.modalService.open(moda, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  delete(id, state) {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
    this.spiner = true;
    const datos = {id, state, correo_baja: this.datosusuario['Correo']};
    this.http.deleteuser(datos)
    .subscribe((resp) => (this.ngOnInit()));
  }
  closemodel(content) {
    this.modalService.dismissAll(content);
  }
  open(id?) {
    console.log(id);
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }

    let datosus: any;
    if (id !== '') {
     datosus = this.ListaUsuarios.getUsuario(id);
     console.log(datosus);
     this.user.Id = id;
     this.user.Nombre = datosus['Nombre'];
     this.user.Apellidos = datosus['Apellidos'];
     this.user.Puesto = datosus['Puesto'];
     this.user.Correo = datosus['Correo'];
     this.user.Usuario = datosus['Usuario'];
     this.user.IDConfig = datosus['IDConfig'];
     this.user.functions = datosus['Funciones'];
     this.user.Imagen = datosus['Imagen'];
     this.user.Celular = datosus['Celular'];
     if ((this.user.Imagen !== null) && (this.user.Imagen !== '')) {
      this.logo_avatar = this.ruta_server + 'assets/img/usuarios/avatar/' + datosus['Imagen'];
     } else {
      this.logo_avatar = 'assets/img/avatar1.png';
     }
    } else {
      this.user.Id = '';
      this.user.Nombre = '';
      this.user.Apellidos = '';
      this.user.Puesto = '';
      this.user.Correo = '';
      this.user.Usuario = '';
      this.user.IDConfig = '';
      this.user.functions = '';
      this.user.Imagen = '';
      this.user.Celular = '';
      this.logo_avatar = 'assets/img/avatar1.png';
    }
    this.datsus = true;
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
  changefunt(e) {
    this.orders[e.target.name]['checado'] = e.target.checked;
  }
  savefunciones() {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
    const dt = [];
  this.orders.forEach((ops) => {
    if (ops['checado'] === true) {
      dt.push('1');
    } else {
      dt.push('0');
    }
  });

  const prv = JSON.stringify(dt);
  this.spiner = true;
  this.http.updatefunction(this.usuariofun, prv)
  .subscribe((resp) => {
    this.spiner = false;
    $('.alert-funciones').removeClass('alert-danger').addClass('alert-success').addClass('show').html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);
    this.ngOnInit();
  }, (error) => {
    this.spiner = false;
    $('.alert-funciones').addClass('show').html(' <strong>Error! </strong>No se puede conectar con el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);

    console.log(error);
  });
  }
  close() {
     this.staticAlertClosed = false;
  }
  alertdele(id) {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
    this.spiner = true;
    const datos = {IDUsuario: id};
    this.http.numregistros_user(datos)
    .subscribe((data) => {
      console.log(data['ok']);
      this.errorrfcSwal.text = 'Se eliminaran todos los resultados relacionados con este usuario tanto realizados y recibidos, total de Registros: ' + data['ok'] + '.';
      this.spiner = false;
      this.deleteuserid = id;
       this.errorrfcSwal.show();
    });



  }
  borrarusuario() {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
    this.spiner = true;
    console.log(this.deleteuserid);
    const datos = {IDUsuario: this.deleteuserid};
   this.http.delete_user(datos)
    .subscribe((pass) => {
       this.spiner = false;
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
    this.user.Imagen = this.file_avatar.name;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logo_avatar = reader.result;
    };
  }
  dame_grupo(e) {
    let nombre = '';
    this.grupos.filter((element) => {
      if (element.IDGrupo === e) {
       nombre = element.Nombre;
      }
    });
    return nombre;
  }
  open_transfiere(id) {
    this.ID_Transfiere = id;
    this.model_transfiere = true;
  }
  transfiere_calificaciones() {
    if (this.funcionesusuario[3] === '0') {
      this.errorralert.show();
      return;
    }
    if (this.ID_Transfiere_a === this.ID_Transfiere) {
      swal('Error!', 'ha seleccionado el mismo usario al que desea transferir.', 'error');
      return ;
    } else {
      this.spiner = true;
      const datos = {emisor: this.ID_Transfiere, receptor: this.ID_Transfiere_a};
      this.http.transferir_calificaciones(datos)
      .subscribe((data) => {
        this.ID_Transfiere_a = '';
        this.model_transfiere = false;
        swal('Exito', 'Datos actualizados', 'success');
        this.spiner = false;
      });
      console.log(this.ID_Transfiere_a , this.ID_Transfiere );
    }
  }
  filtrogrupo() {
    this.listausuarios = this.ListaUsuarios.buscar_grupo(this.selected);
  }
  enviarpassword(idusuario) {
    console.log(idusuario);
    this.spiner=true;
    const datos = {Usuario: idusuario};
    this.http.resendpassword(datos)
    .subscribe(respuesta => {
      this.spiner=false;
      swal('Exito', respuesta['ok'], 'success');
    }, error => {
      this.spiner=false;
      swal('Error', JSON.parse(error), 'error');
    });
  }
}
