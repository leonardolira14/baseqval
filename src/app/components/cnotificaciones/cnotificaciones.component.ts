import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cnotificaciones',
  templateUrl: './cnotificaciones.component.html',
  styleUrls: ['./cnotificaciones.component.scss']
})
export class CnotificacionesComponent implements OnInit {
  datosusuario: any[] = JSON.parse(localStorage.usuarioqval);
  notificaciones: any[] = [];
  listnotificaciones: any[] = [];
  gruposinternos: any[] = [];
  gruposexternos: any[] = [];
  cuestionarios: any[] = [];
  constructor(
    private http: NotificacionesService,
    private router: Router,
  ) { }

  ngOnInit() {
    const datos = { usuario: this.datosusuario['Id'], empresa: this.datosusuario['empresa'] };
    this.http.getnoticacionespregunta(datos)
    .subscribe(responde => {
      console.log(responde);
      this.notificaciones = responde['notificaciones'];
      this.listnotificaciones = responde['notificaciones'];
      this.cuestionarios = responde['cuestionardios'];
      this.gruposexternos = responde['gruposexternos'];
      this.gruposinternos = responde['gruposinternos'];
    }, error => {
      console.log(error);
    });
    console.log(this.datosusuario);
  }
  cuestionario(ir) {
    this.router.navigateByUrl('resultados/' + ir);
  }
  borrar(id) {
    const datos = { notificacion: id, usuario: this.datosusuario['Id'] };
    this.http.deletenotificacion(datos)
    .subscribe(responde => {
      console.log(responde);
      this.notificaciones = responde['notificaciones'];
      this.listnotificaciones = responde['notificaciones'];
      
    }, error => {
      console.log(error);
    });
    console.log(id);
  }
  filter_cuestionario(id) {
    console.log(id.value)
    if (id.value === 'sn') {
      this.notificaciones = this.listnotificaciones;
    } else {
      this.notificaciones = this.listnotificaciones.filter(item => {
        item.IDCuestionario.includes(String(id.value));
      });
    }
  }
  filter_emisor(id) {
    if (id.value === 'sn') {
      this.notificaciones = this.listnotificaciones;
    } else {
      this.notificaciones = this.listnotificaciones.filter(item => {
        item.PerfilCalifica.includes(String(id.value));
      });
    }
  }
  filter_receptor(id) {
    if (id.value === 'sn') {
      this.notificaciones = this.listnotificaciones;
    } else {
      this.notificaciones = this.listnotificaciones.filter(item => {
        item.PerfilCalificado.includes(String(id.value));
      });
    }
  }

}
