import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { userInterface } from '../models/user-interface'; 

import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
usuarios: Observable<any>;
usuario:Observable<any>;
headers:HttpHeaders= new HttpHeaders({
  "Content-Type":"application/json",
  Authorization: 'hdkjfhgskjdfh'
})
  constructor(private http: HttpClient) {

   }
  //funcion para obtener todos los usuarios de la empresa
  getall(datos){
    return (this.usuarios=this.http.post(environment.urlserverp+"getalluser",datos));
  }
  
  update(datos:userInterface){
    return this.http.put<userInterface>(environment.urlserverp+"updateuser",datos)
    .pipe(map(data=>data));
  }
  //funcion para gurdar un nuevo usuario
  saveUser(datos:userInterface){
    return this.http.post<userInterface>(environment.urlserverp+"saveuser",datos)
    .pipe(map(data=>data));
  }
  //funcion para modificar el status de un usuario
  deleteuser(id:string,state:string){
    return this.http.delete<userInterface>(environment.urlserverp+'deleteuser?userdelete='+id+"&userstate="+state)
    .pipe(map(data=>data));
  }
  //funcin para modificar las funciones
  updatefunction(id:string,funciones:string){
    return this.http.post(environment.urlserverp+"updateuserfunction",{id,funciones});
  }
  //saber cuantos registros aparece ese usuario
   numregistros_user(datos){
     return this.http.post(environment.urlserverp+"numregistrosuser",datos);
   }
   delete_user(datos){
return this.http.post(environment.urlserverp+"deleteuserfin",datos);
   }
}
