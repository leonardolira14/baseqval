import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosplusService {

  constructor(
    private http: HttpClient
    )
    {

    }

    // funcion para optener los usuarios
    getall(datos) {
      return this.http.post(environment.urlserverp + 'getalluserplus', datos);
    }
    // funcion para agrefar un usuario
    add(datos) {
      return this.http.post(environment.urlserverp + 'adduserplus', datos);
    }
    update(datos) {
      return this.http.post(environment.urlserverp + 'updateuserplus', datos);
    }

    // funcion para enviar la contraseña
    send_passwodor(datos){
      return this.http.post(environment.urlserverp + 'senspassuserplus', datos);
    }
    
    // funcion para obtener el numero de registro de un usuario
    get_reg_num(datos) {
      return this.http.post(environment.urlserverp + 'countreguserplus', datos);
    }

    // funcion para cambiar el  status de un usuario
    change_status(datos) {
      return this.http.post(environment.urlserverp + 'changeuserplus', datos);
    }
    // funcion para eliminar
    delete(datos) {
      return this.http.post(environment.urlserverp + 'deleteuserplus', datos);
    }

  }
