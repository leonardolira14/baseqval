import { Component, OnInit } from '@angular/core';
import { ConectService } from '../../services/conect.service';

@Component({
  selector: 'app-datosge',
  templateUrl: './datosge.component.html',
  styleUrls: ['./datosge.component.scss']
})
export class DatosgeComponent implements OnInit {
  public dempresa:any;
  public notificaciones:any;
  constructor( private http:ConectService) { }

  ngOnInit() {
    this.dempresa=JSON.parse(localStorage.empresa);
    this.http.notificaciones(this.dempresa["IDEmpresa"])
    .subscribe((rec)=>{
      this.notificaciones=rec["notificaciones"];
      console.log(rec)
    },(error)=>{
      console.log(error);
    })
  }
    
}
