import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  public datos_pago: any = {};
  constructor(private route: Router) { }

  ngOnInit() {
  }
  addcart(id) {
    this.datos_pago['plan'] = id;
    localStorage.setItem('datos_pago_qval', this.datos_pago);
    this.route.navigateByUrl('/registro');
  }
}
