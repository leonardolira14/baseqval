import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private http: HttpClient
    ) { }
    // funcion para obtener las notificaciones para usuarios por pregnta
    getnoticacionespregunta(datos) {
      return this.http.post(environment.urlserverp + 'getnotificaciones', datos);
    }
    // funcion para eliminar una notificacion de pregunta
    deletenotificacion(datos) {
      return this.http.post(environment.urlserverp + 'deletenotificacionpreg', datos);
    }
}
