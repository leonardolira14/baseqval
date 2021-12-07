import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CresultadosService {

  constructor(private http:HttpClient) {

   }
   //funcion para obtener los cuestionarios
   getquestionary(empresa,status){
    return this.http.post(environment.urlserverp+"getquetionary",{empresa,status});
   }
   getresumen(id,fecha,empresa){
    return this.http.post(environment.urlserverp+"getresumen",{id,fecha,empresa});
   }
   //funcion para obtener los resumenes de tablas
   getdetailstable(id,fecha,empresa){
    return this.http.post(environment.urlserverp+"getdetailsresumen",{id,fecha,empresa})
   }
   getdetallepregunta(data){
    return this.http.post(environment.urlserverp+"detalleprunta",data)
   }
}
