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
  }
