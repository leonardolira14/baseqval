import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) {
   }

   //funcion para solicitar todos los sectores
   getsector(){
   return this.http.get(environment.urlserver_admyo+"getallsector")
   	.pipe(map(data=>data));
   }
   getsubsector(sector){
   	return this.http.get(environment.urlserver_admyo+"getallsubsector?sector="+sector)
   	.pipe(map(data=>data));
   }
   getrama(subsector){
   	return this.http.get(environment.urlserver_admyo+"getallrama?subsector="+subsector)
   	.pipe(map(data=>data));
   }
   saveregister(registro){
   	return this.http.post(environment.urlserver_admyo+"saveregister",registro)
   	.pipe(map(data=>data));
   }
   login(login){
      return this.http.post(environment.urlserver_admyo+"login",login)
      .pipe(map(data=>data));
   }
   pago(datos){
     console.log(datos);
     return this.http.post(environment.urlserver_admyo + 'pago', datos);
   }
}
