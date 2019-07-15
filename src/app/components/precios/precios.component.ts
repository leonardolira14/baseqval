import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  @ViewChild('tb_precios')  tb_precios;
  public input_numlic=10;
  public leyenda_qval='';
  public gratis_admyo:boolean=true;
  public micro_admyo:boolean=false;
  public empresa_admyo:boolean=false;
  public micro_admyo_anual:boolean=false;
  public empresa_admyo_anual:boolean=false;
  public empresarial_qval:boolean=true;
  public empresarial_anual:boolean=false;
  public plan_selec:string="gratis";
  public leyenda_admyo='gratis';
  public car=[];
  public num_lic_qval=0;
  public Coste_Final=0;
  public coste_admyo=0;
  public coste_qval=0;
  public anual_qval=false;
  public anual_admyo=false;
  public mensual_qval=true;
  public mensual_admyo=false;
  public datos_pago: any = {};
  constructor(
    private route:Router
    
    ) {
      if(localStorage.card_admyo){
        this.car=JSON.parse(localStorage.card_admyo);
        console.log(this.car[0].leyenda);
        return ;
        if(this.car[0].leyenda){
          this.cambio_micro(this.car[0].leyenda);
          this.cambio_qval(this.car[1].plan);
          this.input_numlic=this.car[1].NumLic;
          this.num_lic();
        }
        
      }
     }

  ngOnInit() {
    this.cambio_qval('empresarial_qval');
  }
  cambio_micro(tipo){
    this.leyenda_admyo=tipo;
    switch(tipo){
      case 'gratis':
        this.micro_admyo=false;
        this.gratis_admyo=true;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Gratis";
        this.coste_admyo=0.00;
        break;
      case 'micro':
        this.micro_admyo=true;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Micro Empresa";
        this.coste_admyo=200;
        this.anual_admyo=false;
        this.mensual_admyo=true;
        break;
      case 'micro_anual':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=true;
        this.empresa_admyo_anual=false;
        this.plan_selec="Micro Empresa Anual";
        this.coste_admyo=2000;
        this.anual_admyo=true;
        this.mensual_admyo=false;
        break;
      case 'empresa':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=true;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=false;
        this.plan_selec="Empresarial";
        this.coste_admyo=1000;
        this.anual_admyo=false;
        this.mensual_admyo=true;
        break;
      case 'empresa_anual':
        this.micro_admyo=false;
        this.gratis_admyo=false;
        this.empresa_admyo=false;
        this.micro_admyo_anual=false;
        this.empresa_admyo_anual=true;
        this.plan_selec="Empresarial Anual";
        this.coste_admyo=10000;
        this.anual_admyo=true;
        this.mensual_admyo=false;
        break;
    }
    this.Coste_Final=this.coste_admyo+this.coste_qval;
  }
  nxt_precio(){
    this.tb_precios
  }
  cambio_qval(tipo){
    switch(tipo){
      case 'empresarial_qval':
        this.empresarial_qval=true;
        this.empresarial_anual=false;
        this.leyenda_qval='empresarial_qval';
        this.mensual_qval=true;
        this.anual_qval=false;
        this.num_lic();
        
        break;
      case 'empresarial_anual':
        this.empresarial_qval=false;
        this.empresarial_anual=true;
        this.leyenda_qval='empresarial_anual';
        this.mensual_qval=false;
        this.anual_qval=true;
        this.num_lic();
        break;
    }
  }
  num_lic(){
    if(this.input_numlic<10){
      Swal("Error","El número de licencias debe ser mayor a 10","error");
    }else{
      let adicional=0;
     switch(this.leyenda_qval){
       case 'empresarial_qval':
        adicional=this.input_numlic-10;
        this.coste_qval=3000+(adicional*100);
        break;
      case 'empresarial_anual':
        adicional=this.input_numlic-10;
        this.coste_qval=30000+((adicional*100)*12);
        break;
     }
     this.Coste_Final=this.coste_admyo+this.coste_qval;
    }
    
  }
  next_pass(){
    this.num_lic();
    this.car=[{'anual':this.anual_admyo,'leyenda':this.leyenda_admyo,'plan':this.plan_selec,'total':this.coste_admyo},{'anual':this.anual_qval,'plan':this.leyenda_qval,'total':this.coste_qval,'NumLic':this.input_numlic}];
    localStorage.setItem("card_admyo",JSON.stringify(this.car));
    console.log(localStorage.card_admyo);
    this.route.navigateByUrl('datosregistro');
  }
  add_plaqval(){
    this.tb_precios.selectedIndex = 2;
    //
  }
  por_momento(){
    this.input_numlic=10;
    this.empresarial_qval=false;
    this.empresarial_anual=false;
    this.coste_qval=0;
    this.mensual_qval=false;
    this.anual_qval=false;
    this.Coste_Final=this.coste_admyo+this.coste_qval;

    this.car=[{'leyenda':this.leyenda_admyo,'plan':this.plan_selec,'total':this.coste_admyo},{'plan':'','total':0,'NumLic':0}];
    

    localStorage.setItem("card_admyo",JSON.stringify(this.car));
    this.route.navigateByUrl('datosregistro');
    
  }
  addcart(id) {
    this.datos_pago['plan'] = id;
    localStorage.setItem('datos_pago_qval', this.datos_pago);
    this.route.navigateByUrl('/registro');
  }
}
