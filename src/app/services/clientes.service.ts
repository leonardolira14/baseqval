import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { ClienteInterface } from '../models/cliente-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  clientes:Observable<any>;
  cliente:Observable<any>;
  
  constructor(private http: HttpClient) {

   }
   //funcion para traer los datos generales
   getgeneral(empresa){
     return this.http.post(environment.urlserverp+"cliente/getdat",{empresa});
   }
   //funcion para actualizar los datos de un cliente
   update(cliente:ClienteInterface){
      return this.http.put<ClienteInterface>(environment.urlserverp+"updateclient",cliente)
      .pipe(map(data=>data));
   }
   //funcion para guardar un cliente
   save(cliente:ClienteInterface){
      return this.http.post<ClienteInterface>(environment.urlserverp+"saveclient",cliente)
      .pipe(map(data=>data));
   }
   update_status(id,status){
    return this.http.post(environment.urlserverp+"deleteclient",{id,status})
      .pipe(map(data=>data));
   }
   //funcion para obtener todos los clientes
   getall(datos){
     return (this.clientes=this.http.post(environment.urlserverp+"getallclient",{empresa:datos}));
   }
   //funcion para obtener los datos de un usuario
   getuser(id:string){
     return (this.cliente=this.http.post<ClienteInterface>(environment.urlserverp+"getuser",{id}));
   }
   numregistros_clie(datos){
     return (this.cliente=this.http.post<ClienteInterface>(environment.urlserverp+"numregistrosclie",datos));
   }
   //funcion para eliminar un cliente
   delete(datos){
    return this.cliente=this.http.post(environment.urlserverp+"borrarcliente",datos);
   }
}
