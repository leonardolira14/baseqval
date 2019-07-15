import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectService } from 'src/app/services/conect.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
@Component({
  selector: 'app-recpass',
  templateUrl: './recpass.component.html',
  styleUrls: ['./recpass.component.scss']
})
export class RecpassComponent implements OnInit {
  correo: string;
  constructor(private http: ConectService, public router: Router, public spinner: NgxSpinnerService) {
    this.correo = '';
   }

  ngOnInit() {
  }
  reccontra() {
    this.spinner.show();
    this.http.recuperapas(this.correo)
    .subscribe((res) => {
      this.spinner.hide();
      if (res['pass'] !== 0) {
        swal('Exito', res['ok'], 'success');
        this.router.navigateByUrl('/');
      } else {
        swal('Error', res['ok'], 'error');
      }
    }, (error) => {
      swal('Error', JSON.stringify(error), 'error');
    });
  }
  login() {
    this.spinner.show();
    this.router.navigateByUrl('/');
  }
}
