import { Component, OnInit } from '@angular/core';
import { UsuariosplusService } from '../../services/usuariosplus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Userplus } from '../../models/userplus-interface';
import { UsuariosList } from '../../class/usuariosplus-lits';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cusuariosplus',
  templateUrl: './cusuariosplus.component.html',
  styleUrls: ['./cusuariosplus.component.scss']
})

export class CusuariosplusComponent implements OnInit {
public  ListaUsuarios = new UsuariosList();
public datsus = false;
public palabra = '';
public  usuarios = [];
public file_avatar: File = null;
public idempresa = '';
public imagePath;
public ruta_server = environment.urlserverp;
public datosempresa: any [] = JSON.parse(localStorage.empresa);
public logo_avatar: any = 'assets/img/avatar1.png';
public user: Userplus = {
  IDUsuario: '',
  Nombre: '',
  Apellidos: '',
  Correo: '',
  Foto: '',
  Status: '',
  Celular: ''

};



constructor(
    private params: ActivatedRoute,
    public http: UsuariosplusService,
    private router: Router,
  ) {
    this.idempresa = this.params.snapshot.paramMap.get('empresa');
}
create(numero, idusuario) {
  swal({
    title: 'Eliminar usuaurio',
    text: '¿Estas seguro de eliminar este usuario?, cuenta con '+numero +' registros.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Acepto'
  }).then((result) => {
    if (result.value) {
      this.delete(idusuario);
    }
  });
}
  ngOnInit() {
    const datos = {IDEmpresa: this.idempresa};
    this.http.getall(datos)
    .subscribe(data => {
      this.ListaUsuarios.limpiar_lista();
      data['response']['usuarios'].forEach(usuario => {
        this.ListaUsuarios.addusuario(usuario);
      });
      this.usuarios = this.ListaUsuarios.getLista();

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
    this.user.Foto = this.file_avatar.name;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logo_avatar = reader.result;
    };
  }
  enviarform() {
    const formData = new FormData();
    const base = JSON.stringify(this.user);
    formData.append('datos', window.btoa(base));
    formData.append('empresa', this.datosempresa['IDEmpresa']);
    if (this.file_avatar !== null) {
      formData.append('Imagen', this.file_avatar, this.file_avatar.name);
    }
    console.log(this.user);
    if (this.user['IDUsuario'] === '') {
      this.http.add(formData)
      .subscribe(data => {
          this.datsus = false;
          swal('Exito', 'Usuario registrado', 'success');
          this.ngOnInit();
      }, error => {
        console.log(error);
        swal('Error', 'Contactar al programador', 'error');
      });
    } else {
      this.http.update(formData)
      .subscribe(data => {
        console.log(data);
        this.datsus = false;
          swal('Exito', 'Datos Actualizados', 'success');
          this.ngOnInit();
      }, error => {
        console.log(error);
        swal('Error', 'Contactar al programador', 'error');
      });
    }
  }

  buscarusuario() {
    this.usuarios = this.ListaUsuarios.buscqueda_palabra(this.palabra);
  }
  open(IDuser) {
    console.log(IDuser);
    if (IDuser !== undefined) {
      this.user = this.ListaUsuarios.getUsuario(IDuser);
      if ((this.user.Foto !== null) && (this.user.Foto !== '')) {
        this.logo_avatar = this.ruta_server + 'assets/img/usuarios/avatar/usuariosplus/' + this.user.Foto;
       } else {
        this.logo_avatar = 'assets/img/avatar1.png';
       }
    } else {
      this.user.Nombre = '';
      this.user.Apellidos = '';
      this.user.Status = '1';
      this.user.Correo = '';
      this.user.Celular = '';
      this.user.Celular = 'assets/img/avatar1.png';
    }
    this.datsus = true;

  }

  enviarpassword(IDUsuario) {
    const datos = {usuario: IDUsuario};
    const datos_code = {datos: window.btoa(JSON.stringify(datos))};
    this.http.send_passwodor(datos_code)
    .subscribe(data => {
      swal('Exito', 'Contraseña enviada al correo electrònico', 'success');
    }, error => {
      console.log(error);
      swal('Error', 'Contactar al programador', 'error');
    }
    );
  }
  delete(IDUsuario) {
    const datos = {usuario: IDUsuario, empresa: this.datosempresa['IDEmpresa']};
    const datos_code = {datos: window.btoa(JSON.stringify(datos))};
    this.http.delete(datos_code)
    .subscribe(data => {
      swal('Exito', 'Datos Actualizados', 'success');
      this.ngOnInit();
    });
  }
  alertdele(IDUsuario) {
    const datos = {usuario: IDUsuario, empresa: this.datosempresa['IDEmpresa']};
    const datos_code = {datos: window.btoa(JSON.stringify(datos))};
    this.http.get_reg_num(datos_code)
    .subscribe(data => {
      this.create(data["response"]["num"], IDUsuario)
    });
  }
  change_status(IDUsuario, status) {
    const datos = {usuario: IDUsuario, status};
    const datos_code = {datos: window.btoa(JSON.stringify(datos))};
    this.http.change_status(datos_code)
    .subscribe(data => {
      swal('Exito', 'Datos Actualizados', 'success');
      this.ngOnInit();
    });
  }
}
