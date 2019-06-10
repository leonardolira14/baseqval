
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {  ConectService } from '../../services/conect.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
public alert_change_pass = false;
public modelcontra: any = {};
  constructor(
    private router: Router,
    private http: ConectService
    ) {

     }

  ngOnInit() {
  }
  salir() {
    localStorage.removeItem('usuarioqval');
    localStorage.removeItem('empresa');
    this.router.navigateByUrl('/');
  }
  goto(ir) {
    this.router.navigateByUrl('/' + ir);
  }
  cambiar_pas() {
    if (this.modelcontra.anterior === undefined) {
      swal('Error!', 'El campo contraseña anteriror es necesario', 'error');
    } else if (this.modelcontra.nueva === undefined) {
      swal('Error!', 'El campo contraseña nueva es necesario', 'error');
    } else if (this.modelcontra.repetir === undefined) {
      swal('Error!', 'El campo repetir contraseña  es necesario', 'error');
    } else if (this.modelcontra.nueva !== this.modelcontra.repetir) {
      swal('Error!', 'Las contraseñas nueva y repetir con traseñaseña no son iguales', 'error');
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
      console.log(this.modelcontra);
    }
  }
}
