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
      });
    } else {
      this.http.update(formData)
      .subscribe(data => {
        console.log(data);
      });
    }
  }
  buscarusuario() {
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
  
  enviarpassword() {

  }
  delete() {

  }
  alertdele() {

  }
}
