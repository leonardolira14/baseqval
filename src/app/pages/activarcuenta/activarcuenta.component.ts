import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { ConectService } from 'src/app/services/conect.service';

@Component({
  selector: 'app-activarcuenta',
  templateUrl: './activarcuenta.component.html',
  styleUrls: ['./activarcuenta.component.scss']
})
export class ActivarcuentaComponent implements OnInit {
  token = '';
  spiner = true;
  constructor(
    private route: Router,
    private params: ActivatedRoute,
    private http: ConectService,

  ) {

   }

  ngOnInit() {
    this.spiner = true;
    this.token = this.params.snapshot.paramMap.get('token');
    const datos = {token: this.token};
    this.http.activacuenta(datos)
    .subscribe(resp => {
      this.spiner = false;
      if (resp['response']['ok'] === 'Error') {
        swal('Error', resp['response']['mensaje'], 'error');
      } else {
        swal('Exito', resp['response']['mensaje'], 'success');
      }
      this.route.navigateByUrl('/');
    });
    console.log(this.token);
  }

}
