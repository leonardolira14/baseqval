import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from  '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CuestionarioInterface  } from '../models/cuestionario-interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {
  cuestionario:Observable<any>;
  cuestionarios:Observable<any>;
  constructor(private http:HttpClient) { }
  getdatos(empresa){
    return this.http.post(environment.urlserverp+"getdatoscues",{empresa});
  }
  //funcion para obtener todos los cuestionarios
  getall(empresa){
    return (this.cuestionarios=this.http.post(environment.urlserverp+"getallquestionary",{empresa}));
  }
  save(cuestionario:CuestionarioInterface){
    return this.http.post(environment.urlserverp+"savequestionary",cuestionario);
  }
  getdata(cuestionario){
    return this.http.post(environment.urlserverp+"dataquestionary",{cuestionario});
  }
  update(cuestionario:CuestionarioInterface){
    return this.http.post(environment.urlserverp+"updatequestionary",cuestionario);
  }
  delete(IDCuestionario,status){
    return this.http.post(environment.urlserverp+"deletequestionary",{IDCuestionario,status});
  }
  numregistros(datos){
     return this.http.post(environment.urlserverp+"numregisrosquestionary",datos);
  }
  borrar(datos){
     return this.http.post(environment.urlserverp+"borrarquestionary",datos);
  }
}
