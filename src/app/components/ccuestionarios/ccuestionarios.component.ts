import { Component, OnInit,ViewChild } from '@angular/core';
import { CuestionariosService } from '../../services/cuestionarios.service'
import { ClientesList } from '../../class/clientes-list'; 
import { CuestionarioInterface } from 'src/app/models/cuestionario-interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2'
@Component({
  selector: 'app-ccuestionarios',
  templateUrl: './ccuestionarios.component.html',
  styleUrls: ['./ccuestionarios.component.scss']
})
export class CcuestionariosComponent implements OnInit {
    @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
    @ViewChild('errorralert') private errorralert: SwalComponent;
     @ViewChild('datoscuest') private datoscuest;
public cuestionario:CuestionarioInterface={
  Email:"",
  Fecha:"",
  IDCuestionario:"",
  IDEmpresa:"",
  Nombre:"",
  Status:"",
  Wats:"",
  cuestionario:"",
  PerfilCalifica:"",
  PerfilCalificado:"",
  TPEmisor:"",
  TPReceptor:""
}
alertterror:string;
datosusuario:any[]=JSON.parse(localStorage.usuarioqval);
funcionesusuario:any[]=[];
staticAlertClosed = false;
closeResult: string;
public pageActual:number=1;
public palabra:string;
public datosempresa;
public cuestionariolist:any[]=[];
public cuestionario_lista=new ClientesList();
public grupos:any[]=[];
public preguntas:any[]=[];
public orders= [];
orderForm: FormGroup;
form:FormGroup;
deleteclientid:string="";
  constructor(private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private modalService: NgbModal,public http:CuestionariosService) { 
   
    this.datosempresa=JSON.parse(localStorage.empresa);
     this.funcionesusuario=JSON.parse(this.datosusuario["funciones"]);
  }
  nggeneral(){
    
    this.http.getdatos(this.datosempresa["IDEmpresa"])
    .subscribe((resp)=>{
      if(resp["grupos"]!=false){
          this.grupos=resp["grupos"];
      } 
      if(resp["preguntas"]!=false){
        this.orders=resp["preguntas"];
      }
      const controls = this.orders.map(c => new FormControl(false));
      controls[0].setValue(true); 
      this.form = this.formBuilder.group({
        orders: new FormArray(controls)
      })
      
    })
  }
  ngOnInit() {
    this.spinner.show();
    this.nggeneral();
    this.cuestionario_lista.limpiarlista();
    this.http.getall(this.datosempresa["IDEmpresa"])
    .subscribe((resp)=>{
      this.spinner.hide();
      if(resp["ok"]!=false){
        resp["ok"].forEach(element => {
          this.cuestionario_lista.addcliente(element)
        });
        this.cuestionariolist=this.cuestionario_lista.getList();
      }
    })
  }
  open(model){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    this.cuestionario.Email="";
    this.cuestionario.Fecha="";
    this.cuestionario.IDCuestionario="";
    this.cuestionario.Nombre="";
    this.cuestionario.IDEmpresa="";
    this.cuestionario.PerfilCalifica="";
    this.cuestionario.PerfilCalificado="";
    this.cuestionario.Status="";
    this.cuestionario.TPEmisor=""
    this.cuestionario.Wats="";
    this.cuestionario.cuestionario="";
    this.modalService.open(model, {ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  export(){

  }
  buscarcuestionario(){
    this.cuestionariolist=this.cuestionario_lista.buscarpalabra(this.palabra);
  }
  requestuser(x,y){

   if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    this.http.getdata(y)
    .subscribe((resp)=>{
      this.cuestionario.IDCuestionario=resp["cuestionario"]["IDCuestionario"];
      this.cuestionario.Nombre=resp["cuestionario"]["Nombre"];
      this.cuestionario.Status=resp["cuestionario"]["Status"];
      this.cuestionario.Wats=(resp["cuestionario"]["Wats"]=="1")? true:false;
      this.cuestionario.Email=(resp["cuestionario"]["Email"]=="1")? true:false;
      this.cuestionario.PerfilCalifica=[resp['detalles']["PerfilCalifica"]];
      this.cuestionario.PerfilCalificado=[resp['detalles']["PerfilCalificado"]];
      this.cuestionario.IDEmpresa=this.datosempresa["IDEmpresa"];
      let lis=resp['detalles']["Cuestionario"];
      lis=lis.split(",");
      console.log(lis);
      lis.forEach(element => {
          this.orders.forEach((p)=>{
              if(p.Nomenclatura===element){
                p.checado=true;
              }
          })
      });
      this.spinner.hide();
      this.modalService.open(x, {ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    },(error)=>{
      console.log(error)
    })
  }
  delete(x,y){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    this.http.delete(x,y)
    .subscribe((resp)=>{    
      this.ngOnInit();
    })
  }

  enivarform(){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    if(this.cuestionario.IDCuestionario===""){
      this.save();
    }else{  
      this.update();
    }

  }
  chengepreg(e){
    this.orders[e.target.name]["checado"]=e.target.checked;
  
  }
  save(){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    let cues:string="";
    this.orders.forEach((pregunta)=>{
        if(pregunta["checado"]===true){
          cues+=pregunta["Nomenclatura"]+",";
        }
    })
    this.cuestionario.IDEmpresa=this.datosempresa["IDEmpresa"];
    this.cuestionario.cuestionario=cues;
    this.cuestionario.Status="1";
    this.http.save(this.cuestionario)
    .subscribe((resp)=>{
      $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Cuestionario Registrado...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
      this.ngOnInit();
    },(error)=>{
      this.spinner.hide();
      $(".alert-funciones").addClass("show").html(' <strong>Error! </strong>No se puede conectar con el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
    })
    this.closemodel(this.datoscuest)
    //console.log(this.cuestionario);
  }
  update(){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    let cues:string="";
    this.orders.forEach((pregunta)=>{
        if(pregunta["checado"]===true){
          cues+=pregunta["Nomenclatura"]+",";
        }
    })
    this.cuestionario.cuestionario=cues;
    this.http.update(this.cuestionario)
    .subscribe((resp)=>{
      $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Cuestionario Actualizado...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      setTimeout(()=>{
        $(".alert-funciones").removeClass("show");
      },4000)
    this.ngOnInit();
    },(error)=>{
      this.spinner.hide();
      $(".alert-funciones").addClass("show").html(' <strong>Error! </strong>No se puede conectar con el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
    })
    this.closemodel(this.datoscuest)
  }
  closemodel(content){
    this.modalService.dismissAll(content);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  close(){
     this.staticAlertClosed=false;
  }
  alertdele(id){
    if(this.funcionesusuario[6]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    let datos={IDCuestionario:id}
    this.http.numregistros(datos)
    .subscribe((data)=>{
      console.log(data["ok"]);
      this.errorrfcSwal.text="Se eliminaran todos los resultados relacionados con este cuestionario, realizados y recibidos, total de Registros: "+data["ok"]+".";
      this.spinner.hide();
      this.deleteclientid=id
       this.errorrfcSwal.show();
    })
  }
  borrarcuestionario(){
    this.spinner.show();
    var datos={IDCuestionario:this.deleteclientid}
    this.http.borrar(datos)
    .subscribe((data)=>{
      this.ngOnInit();
    })
  }
}
