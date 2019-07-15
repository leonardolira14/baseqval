import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectService {

  constructor(private http: HttpClient) {

   }
   cambio_pass(datos) {
    return this.http.post(environment.urlserverp + 'cambiopas', datos);
   }
   registro(datos) {
    return this.http.post(environment.urlserverp + 'registro', datos);
   }

   datos_pararegistro() {
    return this.http.get(environment.urlserverp + 'getdatos');
   }
   login(datos) {
      return this.http.post(environment.urlserverp + 'login', {datos});
   }
   recuperapas(datos) {
    return this.http.post(environment.urlserverp + 'forgetpass', {datos});
   }
  // funcion para los datos del panel
   panel(datos) {
     return  this.http.post(environment.urlserverp + 'panel', {datos});
   }
   // funcion para obtenr las notificaciones
   notificaciones(datos) {
     return this.http.post(environment.urlserverp + 'Notificacion', {datos});
   }
   // funcion para enviar los datos de actualizacion de un usuario
   updateusu(datos) {
    return this.http.post(environment.urlserverp + 'updateus', datos);
   }
   // funcion para actulizar los datos de la empresa
   updateempresa(datos) {
     return this.http.post(environment.urlserverp + 'updateempresa', datos);
   }
   // funcion para obtner todos los grupos
   getgrupos(empresa) {
    return this.http.post(environment.urlserverp + 'getgrupos', empresa);
   }
   // funcin para modificar un grupo
   updategrupo(grupo) {
     return this.http.post(environment.urlserverp + 'updategrupo', grupo);
   }
   // funcion para desactivar un grupo un grupo
   updatestatusgrupo(grupo) {
    return this.http.post(environment.urlserverp + 'updatestatusg', grupo);
   }
   // funcion para eliminar un grupo
   delete_grupo(datos) {
    return this.http.post(environment.urlserverp + 'deletegrupo', datos);
   }

   // funcion para actualizar un grupo
   updategrop(datos) {
     return this.http.post(environment.urlserverp + 'updategrupo', datos);
   }
   // funcion para agregar un nevo servicio
   addgroup(datos) {
     return this.http.post(environment.urlserverp + 'addgroup', datos);
   }
   // recuperacion de contraseña con password
   change_password(datos) {
    return this.http.post(environment.urlserverp + 'changepassword', datos);
   }
   // function para activar una cuenta de un usuario
   activacuenta(datos) {
    return this.http.post(environment.urlserverp + 'activacuenta', datos);
   }
}
