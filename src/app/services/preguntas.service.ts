import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PreguntasInterface } from '../models/pregunta-interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  pregunta:Observable<any>;
  constructor(private http:HttpClient) { 

  }
  //funcion para obtener todas las preguntas de una empresa
  getall(empresa){
    return this.http.post(environment.urlserverp+"getallask",{empresa});
  }
  update(pregunta:PreguntasInterface){
    return this.http.post(environment.urlserverp+"updateask",pregunta);
  }
  save(pregunta:PreguntasInterface){
    return this.http.post(environment.urlserverp+"saveask",pregunta);
  }
  delete(id,status){
    return this.http.post(environment.urlserverp+"updatestatusask",{id,status});
  }
  numregistros(datos){
    return this.http.post(environment.urlserverp+"numregistrospregunta",datos);
  }
  borrar(datos){
    return this.http.post(environment.urlserverp+"deleteask",datos);
  }
}
