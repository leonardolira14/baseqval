import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../class/empresa';
import {Usuario} from '../../class/usuario';
import { ConectService } from '../../services/conect.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { element } from 'protractor';
@Component({
  selector: 'app-logoge',
  templateUrl: './logoge.component.html',
  styleUrls: ['./logoge.component.scss']
})
export class LogogeComponent implements OnInit {
  public alert_change_pass = false;
  public modelcontra: any = {};
  spiner = false;
  usuario: Usuario = null;
  empresa: Empresa = null;
  IDGrupo_usuario: any;
  nombreus: string;
  apellidos: string;
  puesto: string;
  correo: string;
  razon_social: string;
  nombre_comercial: string;
  Celular: string;
  r_f_c: string;
  nempleados: string;
  perfile: string;
  nousaurios: string;
  noclientes: string;
  nocuestionario: string;
  nopreguntas: string;
  nogrupo: string;
  closeResult: string;
  tem: string;
  facanual: string;
  tel: string;
  municipio: string;
  colonia: string;
  calle: string;
  cp: string;
  estado: string;
  Estados: any[] = [];
  FacAnual: any[] = [];
  NoEmpleados: any[] = [];
  TipoEmpresa: any[] = [];
  Logoempresa: string;
  LogoUsuario: any;
  Banner: string;
  filebanner: File = null;
  filelogo: File = null;
  rut: string;
  registerForm: FormGroup;
  submitted = false;
  file_avatar: File = null;
  file_banner: File = null;
  file_logo: File = null;
  logo_banner: any;
  logo_logo: any;
  logo_avatar: any;
  alert_datos_empresa = false;
  datsus = false;
  ultimas_encuestas = [];
  grupos = [];
  grupo_usuario: any;
  datos_pago: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: ConectService,
        ) {
    this.rut = environment.urlserverp;
    this.cargarStorage();
    this.registerForm = this.formBuilder.group({
      razon_social: [this.razon_social, Validators.required],
      nombre_comercial: [this.nombre_comercial, Validators.required],
      rfc: [this.r_f_c, Validators.required],
      tem: [this.tem, Validators.required],
      nempleados: [this.nempleados, Validators.required],
      facanual: [this.facanual, Validators.required],
      tel: [this.tel, Validators.required],
      perfile: [this.perfile],
      calle: [this.calle],
      municipio: [this.municipio],
      colonia: [this.colonia],
      estado: [this.estado],
      cp: [this.cp],
      empresa: [this.empresa.getID()]
    });
  }

  ngOnInit() {
    console.log();
  }
  open_datos_empresa() {
    this.alert_datos_empresa = true;
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  cargarStorage() {
   this.spiner = true;
    if (localStorage.usuarioqval) {
      const dusuarios = JSON.parse(localStorage.usuarioqval);
      this.usuario = new Usuario(
        dusuarios['Id'],
        dusuarios['nombre'],
        dusuarios['apellido'],
        dusuarios['empresa'],
        dusuarios['Puesto'],
        dusuarios['Config'],
        dusuarios['Usuario'],
        dusuarios['Correo'],
        dusuarios['funciones'],
        dusuarios['Imagen'],
        dusuarios['Celular']
        );
      const dempresa = JSON.parse(localStorage.empresa);
     
      this.empresa = new Empresa(
        dempresa['IDEmpresa'],
        dempresa['Rason_Social'],
        dempresa['Nombre_Comercial'],
        dempresa['RFC'],
        dempresa['Tipo_Empresa'],
        dempresa['NoEmpleados'],
        dempresa['Facturacion_Anual'],
        dempresa['Perfil'],
        dempresa['CalleyNumero'],
        dempresa['Colonia'],
        dempresa['Logo'],
        dempresa['Municipio'],
        dempresa['Cp'],
        dempresa['Estado'],
        dempresa['Telefono'],
        dempresa['Banner'],
        dempresa['Paquete']
        );
        if(this.empresa.getpaquete() !== ''){
          this.datos_pago = JSON.parse(this.empresa.getpaquete());
        }
        
        
      this.Banner = this.empresa.getBanner();
      this.logo_banner = 'assets/img/bg_second.jpg';
        if (this.Banner !== '') {
          this.logo_banner = this.rut + 'assets/img/bannerempresa/' + this.Banner;
        }
      this.Logoempresa = this.empresa.getLogo();
      this.logo_logo  = 'assets/img/elgestor.png';
        if (this.Logoempresa !==  '') {
          this.logo_logo  = environment.urlserverp + 'assets/img/logoempresa/' + this.Logoempresa;
         }
      this.nombreus = this.usuario.getNombre();
      this.apellidos = this.usuario.getApellido();
      this.grupo_usuario = this.usuario.getConfig();
      this.LogoUsuario = this.usuario.getAvatar();
      this.Celular = this.usuario.getCelular();
      this.logo_avatar  = 'assets/img/elgestor.png';
        if ((this.LogoUsuario !== '') && (this.LogoUsuario !== null) ) {
          this.logo_avatar = environment.urlserverp + 'assets/img/usuarios/avatar/' + this.LogoUsuario;
         }
         console.log(this.LogoUsuario, this.logo_avatar);
      this.puesto = this.usuario.getPuesto();
      this.correo = this.usuario.getCorreo();
      this.razon_social = this.empresa.getRazon();
      this.nombre_comercial = this.empresa.getNombreC();
      this.nempleados = this.empresa.getNoEm();
      this.perfile = this.empresa.getPerfil();
      this.r_f_c = this.empresa.getrfc();
      this.facanual = this.empresa.getFac();
      this.tem = this.empresa.getTipo();
      this.calle = this.empresa.getCalle();
      this.municipio = this.empresa.getMun();
      this.estado = this.empresa.getEstado();
      this.tel = this.empresa.getTelefono();
      this.cp = this.empresa.getCp();
      this.colonia = this.empresa.getColonia();
      this.http.panel(this.empresa.getID())

      .subscribe((resp) => {
        console.log(resp);
        this.nousaurios = resp['NoUsuarios']['NumUsuarios'];
        this.noclientes = resp['NoCliente']['numclientes'];
        this.nocuestionario = resp['NoCuestionario']['numcuestionarios'];
        this.nopreguntas = resp['NoPregunta']['numpregunta'];
        this.nogrupo = resp['NoGrupo']['numgrupo'];
        this.Estados = resp['estados'];
        this.FacAnual = resp['Facturacion'];
        this.NoEmpleados = resp['NoEmpleados'];
        this.TipoEmpresa = resp['tipos_empresa'];
        if ( resp['encuestas'] !== false) {
          this.ultimas_encuestas = resp['encuestas'];
        }
        if ( resp['GruposInternos'] !== false) {
          this.grupos = resp['GruposInternos'];
        }
        this.IDGrupo_usuario = this.get_grupo(this.usuario.getConfig());
        this.spiner = false;
      }, (error) => {
        this.spiner = false;
        swal('Error', JSON.stringify(error), 'error');
      });
    }
  }
  cargabanner(event) {
    this.filebanner = <File>event.target.files[0];
  }
  cargalogo(event) {
    this.file_logo = <File>event.target.files[0];

  }
  update_grupo_usuario(id) {
    this.IDGrupo_usuario = this.get_grupo(id);
    this.usuario.updateConfig(id);
  }
  updatedataus() {
   this.spiner = true;
    const form = new FormData();
  if (this.file_avatar !== null) {
      form.append('logo', this.file_avatar, this.file_avatar.name);
      this.usuario.update_avatar(this.file_avatar.name);
    }
   form.append('IDConfig', this.usuario.getConfig());
   form.append('Imagen', this.usuario.getAvatar());
   form.append('empresa', this.empresa.getID());
   form.append('nombreus', this.nombreus);
   form.append('apellido', this.apellidos);
   form.append('correo', this.correo);
   form.append('puesto', this.puesto);
   form.append('num', this.usuario.getId());
   form.append('celular', this.Celular);
   this.http.updateusu(form)
   .subscribe((pass) => {
     if (pass['ok'] === true) {
      this.usuario.updateNombre(this.nombreus);
      this.usuario.updateApellido(this.apellidos);
      this.usuario.updatePuesto(this.puesto);
      this.usuario.updateCorreo(this.correo);
      this.usuario.updateCelular(this.Celular);
      this.guardarUsuario('.alert-datosus');
      this.datsus = false;
    }
  }, (error) => {
    this.spiner = false;
    swal('Error!', 'No se puede conectar con el servidor.' + JSON.stringify(error), 'error');
  });
 }
 guardarUsuario(cade) {
  this.spiner = false;
  swal('Exito!', 'Datos Actualizados...', 'success');
  localStorage.removeItem('usuarioqval');
  localStorage.setItem('usuarioqval', JSON.stringify(this.usuario));
  localStorage.removeItem('empresa');
  localStorage.setItem('empresa', JSON.stringify(this.empresa));
}
guardar_datos_empresa(event) {
   const form = new FormData();
  if (this.usuario.getfunciones()[1] === '0') {
    swal('Error!', 'No esta autorizado para modificar los datos de la empresa', 'error');
    return;
  }
  if (this.registerForm.status === 'INVALID') {
    swal('Error!', 'Existen errores en el formulario', 'error');
    return;
  }
    if (this.file_banner !== null) {
      form.append('banner', this.file_banner, this.file_banner.name);
      this.Banner = this.file_banner.name;
    }

    if (this.file_logo !== null) {
      form.append('logo', this.file_logo, this.file_logo.name);
      this.Logoempresa = this.file_logo.name;
    }
  this.spiner = true;
  this.empresa.updateLogo(this.Logoempresa);
  this.empresa.updateBanner(this.Banner);
  this.empresa.updateRazon(event.value['razon_social']);
  this.empresa.updateNoEm(event.value['nombre_comercial']);
  this.empresa.updaterfc(event.value['rfc']);
  this.empresa.updateTipo(event.value['tem']);
  this.empresa.updateNoEm(event.value['nempleados']);
  this.empresa.updatePerfil(event.value['perfile']);
  this.empresa.updateTelefono(event.value['perfile']);
  this.empresa.updateCalle(event.value['calle']);
  this.empresa.updateColonia(event.value['colonia']);
  this.empresa.updateEstado(event.value['estado']);
  this.empresa.updateCp(event.value['cp']);
  this.empresa.updateFac(event.value['facanual']);
  form.append('datos' , JSON.stringify(event.value));
  this.http.updateempresa(form)
  .subscribe((pass) => {

    if (pass['ok'] === 1) {
      this.alert_datos_empresa = false;
      this.empresa.updateRazon(this.razon_social);
      this.guardarUsuario('.alert-datosgen');
    } else {
      this.spiner = false;
      swal('Error!', 'No se puede conectar con el servidor.', 'error');
    }
  }, (error) => {
    console.log(error);
  });

}
alerterrordempresa(text) {
  swal('Error!', text, 'error');
}
goto(ir) {
  this.router.navigateByUrl('/' + ir);
}
change_img_banner(files) {
  if (files.length === 0) {
    return;
  }

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    swal('Error!', 'Archivo no soportado', 'error');
    return;
  }
  this.file_banner = <File>files[0];
  this.Banner = this.file_banner.name;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.logo_banner = reader.result;
  };
}
change_img_logo(files) {
  if (files.length === 0) {
    return;
  }

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    swal('Error!', 'Archivo no soportado', 'error');
    return;
  }
  this.file_logo = <File>files[0];
  this.Logoempresa = this.file_logo.name;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.logo_logo = reader.result;
  };
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
  this.LogoUsuario = this.file_avatar.name;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.logo_avatar = reader.result;
  };
}
get_grupo(id) {
 let nombre = 'Sin Grupo';
this.grupos.forEach((elementin) => {
  if (elementin.IDGrupo === id) {
   nombre = elementin.Nombre;
  }
});
return nombre;
}
cambiar_pas() {
  if (this.modelcontra.anterior === undefined) {
    swal('Error!', 'El campo contraseña anteriror es necesario', 'error');
  } else if (this.modelcontra.nueva === undefined) {
    swal('Error!', 'El campo contraseña nueva es necesario', 'error');
  } else if (this.modelcontra.repetir === undefined) {
    swal('Error!', 'El campo confirmar contraseña  es necesario', 'error');
  } else if (this.modelcontra.nueva !== this.modelcontra.repetir) {
    swal('Error!', 'Las contraseñas nueva y confirmar contraseña no son iguales', 'error');
  } else if (this.modelcontra.nueva.length < 6) {
    swal('Error!', 'La contraseña debe ser mayor a 6 caracteres', 'error');
  } else {
    const dusuarios = JSON.parse(localStorage.usuarioqval);
    console.log(dusuarios);
    this.modelcontra['IDEmpresa'] = dusuarios['empresa'];
    this.modelcontra['IDUsuario'] = dusuarios['Id'];
    this.http.cambio_pass(this.modelcontra)
    .subscribe(data => {
      console.log(data);
      if (data['response']['code'] === 1990) {
        swal('Error!', data['response']['result'], 'error');
      } else {
        swal('Exito!', 'Datos Actualizados...', 'success');
      }
    });

  }
}
}
