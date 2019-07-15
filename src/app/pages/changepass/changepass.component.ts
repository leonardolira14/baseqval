import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { ConectService } from 'src/app/services/conect.service';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {
  public nueva: string;
  public confirma: string;
  public token: string;
  constructor(
    private router: Router,
    private http: ConectService,
    private params: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.token = this.params.snapshot.paramMap.get('token');
  }
  update() {
    if ((this.nueva === '') || (this.confirma === '')) {
      swal('Error', 'Los campos no deben de estar vacios.', 'error');
    } else if (this.nueva !== this.confirma) {
      swal('Error', 'Las contraseñas no son iguales.', 'error');
    } else {
      const datos = {token: this.token, clave: this.nueva};
      this.http.change_password(datos)
      .subscribe(respuesta => {
        if (respuesta['response']['code'] === 1990) {
          swal('Error', respuesta['response']['result'], 'error');
        } else {
          swal('Exito', 'El cambio de contraseña fue exitoso', 'success');
          this.router.navigateByUrl('/');
        }
      });
    }
  }
}
