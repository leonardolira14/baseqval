import { Component, OnInit } from '@angular/core';
import { ConectService } from 'src/app/services/conect.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Usuario } from '../../class/usuario';
import { Empresa } from '../../class/empresa';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user:string;
    pas:string;
    usuario: Usuario = null;
    empresa: Empresa=null;
    record= true;
  constructor(private cookieService: CookieService,private http:ConectService,public router:Router,private spinner: NgxSpinnerService)  {
    this.user='';
    this.pas = '';
  }
   ngOnInit() {
    let datos = [];
    if (this.cookieService.get('login') !== '') {
       datos = JSON.parse(this.cookieService.get('login'));
       this.user = datos['user'];
       this.pas = datos['pass'];
    }

   }
    recpas() {
      this.router.navigateByUrl('/recpass');
    }

  envilogin(event: any) {
    if (event['code'] === 'Enter') {
      this.login();
    }

  }
  login() {

    this.spinner.show();
    this.http.login({user: this.user, pas: this.pas})
    .subscribe((res) => {
       console.log(res);
      if (res['pass'] !== 0) {

        this.usuario = new Usuario(res['datos']['IDUsuario'], res['datos']['Nombre'], res['datos']['Apellidos'], res['datos']['IDEmpresa'], res['datos']['Puesto'], res['datos']['IDConfig'], res['datos']['Usuario'], res['datos']['Correo'], res['datos']['funciones'],res['datos']['Imagen']);
        this.empresa = new Empresa(res['empresa']['IDEmpresa'], res['empresa']['RazonSocial'], res['empresa']['NombreComercial'], res['empresa']['RFC'], res['empresa']['TipoEmpresa'], res['empresa']['NoEmpleados'], res['empresa']['FacturacionAnual'], res['empresa']['Descripcion'], res['empresa']['Calleynum'], res['empresa']['Colonia'], res['empresa']['Logo'], res['empresa']['Municipio'], res['empresa']['CP'], res['empresa']['Estado'], res['empresa']['Telefono'], res['empresa']['Banner']);
        this.guardarUsuario();
      } else {
        this.spinner.hide();
        $('.alert-login').addClass('show').html(' <strong>Error! </strong>Usuario y/o Contraseña no validos <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        console.log('no pasa');
        setTimeout(() => {
          $('.alert-login').removeClass('show');
        }, 4000);
      }
    }, (err) => {
      this.spinner.hide();
      $('.alert-login').addClass('show').html(' <strong>Error! </strong>Error de conexion favor de contactar al desarrollador.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      console.log('no pasa');
      setTimeout(() => {
        $('.alert-login').removeClass('show');
      }, 4000);
    });
  }
  guardarUsuario() {
    this.spinner.hide();
    if (this.record) {
      this.cookieService.set( 'login', JSON.stringify({user: this.user, pass: this.pas}));
    }
    localStorage.setItem('usuarioqval', JSON.stringify(this.usuario));
    localStorage.setItem('empresa', JSON.stringify(this.empresa));
    this.router.navigateByUrl('/general');
  }
}
