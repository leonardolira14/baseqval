import { Component, OnInit, ViewChild } from '@angular/core';
import { ConectService } from '../../services/conect.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var Conekta: any;
// tslint:disable-next-line:prefer-const
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  @ViewChild('stepper') stepper;
public numero_de_lic = 10;
public total_pago = 0;
public datos_pago: any = {};
public isLinear = false;
public model_pago_tarjeta: any = [];
public model_pago_oxxo: any = [];
public model_pago_transferencia: any = [];
public descripcion_pago;
public noempleados: any = [];
public tipo_empresa: any = [];
public spiner = false;


  constructor(
    private http: ConectService,
    private route: Router
    ) {
      Conekta.setPublicKey('key_FyDezBeanVXwWDm3CzbqEtQ');
      Conekta.setLanguage('es');
   }

  ngOnInit() {
    if (localStorage.getItem('datos_pago_qval')) {
      this.datos_pago = JSON.parse(localStorage.getItem('datos_pago_qval'));
      console.log(this.datos_pago);
      this.stepper.selectedIndex = 1;
    }
    this.cambio_cant();
    this.http.datos_pararegistro()
    .subscribe((data) => {
      this.noempleados = data['NoEmpleados'];
      this.tipo_empresa = data['tipos_empresa'];
     console.log(data);
    });
  }
  select_plan(id) {
    this.datos_pago['plan'] = id;
    if (id === '0') {
      this.descripcion_pago = 'Subscripción Mesual';
      this.total_pago = 3000;
    } else {
      this.descripcion_pago = 'Subscripción Anual';
      this.total_pago = 30000;
    }
    this.stepper.selectedIndex = 1;
    this.cambio_cant();
  }
  cambio_cant() {
    const restante = this.numero_de_lic - 10;
    if (this.datos_pago['plan'] === '0') {
      this.total_pago = 3000 + (restante * 100);
    } else {

      this.total_pago = 30000 + (restante * 1000);
    }
    this.guarda_datos();
  }
  next_0() {
    this.stepper.selectedIndex = 0;
  }
  next_1() {

    if ( (this.datos_pago.nombre === '') || (this.datos_pago.nombre === undefined) ) {
      swal('Error!', 'El campo nombre es necesario.', 'error');
    } else if ( (this.datos_pago.apellidos === '') || (this.datos_pago.apellidos === undefined)  ) {
      swal('Error!', 'El campo apellidos es necesario.', 'error');
    } else if ( (this.datos_pago.correo === '') || (this.datos_pago.correo === undefined)  ) {
      swal('Error!', 'El campo correo electrònico es necesario.', 'error');
    } else if (this.datos_pago.repetircorreo !== this.datos_pago.correo ) {
      swal('Error!', 'Los campos correo electrònico y repetir correo electrònico no son iguales.', 'error');
    } else if (this.datos_pago.repetircorreo !== this.datos_pago.correo ) {
      swal('Error!', 'El campo Razòn Social es necesario.', 'error');
    } else if (this.numero_de_lic < 10) {
      swal('Error!', 'El nùmero de licencia debe ser mayor o igual a 10.', 'error');
    } else  {
      this.stepper.selectedIndex = 2;
      this.model_pago_tarjeta.nombre = this.datos_pago.nombre;
      this.model_pago_tarjeta.apellidos = this.datos_pago.apellidos;
      this.model_pago_tarjeta.correo = this.datos_pago.correo;
      this.model_pago_tarjeta.telefono = this.datos_pago.tel;
      this.guarda_datos();

    }
  }
  guarda_datos() {
    console.log(this.datos_pago);
    localStorage.setItem('datos_pago_qval', JSON.stringify(this.datos_pago));
    console.log( localStorage.datos_pago_qval);
  }
  pago_tarjeta() {
    if ((this.model_pago_tarjeta.numero === '') || (this.model_pago_tarjeta.numero === undefined)) {
      swal('Error!', 'Ingresa los 16 nùmeros de tutarjeta', 'error');
    } else if ((this.model_pago_tarjeta.cvv === '') || (this.model_pago_tarjeta.cvv === undefined)) {
      swal('Error!', 'Ingresa los ùltimos 3 números en el reverso de tu tarjeta', 'error');
    } else if ((this.model_pago_tarjeta.mes === '') || (this.model_pago_tarjeta.mes === undefined)) {
      swal('Error!', 'Ingresa el mes de vencimiento de tu tarjeta', 'error');
    } else if ((this.model_pago_tarjeta.anio === '') || (this.model_pago_tarjeta.anio === undefined)) {
      swal('Error!', 'Ingresa el año de vencimiento de tu tarjeta', 'error');
    } else {
      const tokenParams = {
        'card': {
          'number': this.model_pago_tarjeta.numero,
          'name': this.model_pago_tarjeta.nombre + ' ' + this.model_pago_tarjeta.apellidos ,
          'exp_year': this.model_pago_tarjeta.anio,
          'exp_month': this.model_pago_tarjeta.mes,
          'cvc': this.model_pago_tarjeta.cvv,
        }
      };
      Conekta.token.create(tokenParams, (data) => {
        let telefono = '0000000000';
        if ((this.model_pago_tarjeta.telefono === undefined) || (this.model_pago_tarjeta.telefono === '') ) {
          telefono = '0000000000';
        } else {
          telefono = this.model_pago_tarjeta.telefono;
        }
        this.datos_pago['pago'] = {
          metodo: 'tarjeta',
          token: data.id,
          nombre: tokenParams.card.name,
          total: this.total_pago,
          correo: this.model_pago_tarjeta.correo,
          tel: telefono,
          descripcion: this.descripcion_pago + ' por: ' + this.numero_de_lic + ' licencias Qval'
        };
        this.spiner = true;
       this.http.registro(this.datos_pago)
       .subscribe( datas => {
        this.spiner = false;
       if (datas['ok'] === 'succes') {
        // tslint:disable-next-line:max-line-length
        swal('Exito!', 'Gracias por su compra,se han enviado las instrucciones para la activaciòn de la cuenta al correo electrònico', 'success');
        localStorage.removeItem('datos_pago_qval');
        this.goto('');
      } else {
        swal('Error!', datas['error'], 'error');
       }
       });
      }, (error) => {
        this.spiner = false;
        swal('Error!', error.message_to_purchaser, 'error' );
      });
    }
  }
  goto(ir) {
    this.route.navigateByUrl('/' + ir);
  }
}

