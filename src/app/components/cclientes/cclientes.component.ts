import { Component, OnInit,ViewChild } from '@angular/core';
import { ClienteInterface } from '../../models/cliente-interface';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import {ClientesList } from '../../class/clientes-list'
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2'
@Component({
  selector: 'app-cclientes',
  templateUrl: './cclientes.component.html',
  styleUrls: ['./cclientes.component.scss']
})
export class CclientesComponent implements OnInit {
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorralert') private errorralert: SwalComponent;
  @ViewChild('modalclint') private modalclint;
public palabra:string;
pageActual:number=1;
closeResult: string;
datosusuario:any[]=JSON.parse(localStorage.usuarioqval);
funcionesusuario:any[]=[];
public clientes=new ClientesList();
public cliente:ClienteInterface={
  IDCliente:"",
  Nombre:"",
  RFC:"",
  Usuario:"",
  Pais:"",
  Municipio:"",
  Direccion:"",
  Puesto:"",
  Tel:"",
  NombreComercial:"",
  EEstado:"",
  Correo:"",
  Actipass:"",
  IDConfig:"",
  Estado:"",
  TPersona:"",
  Apellidos:"",
  IDEmpresa:"",
  Telcontact:""
}
alertterror:string;
staticAlertClosed = false;
public Listclientes:any[]=[];
public codeqr:string;
public datos_empresa;
public estados:any[]=[];
public grupos:any[]=[];
public deleteclientid:string="";
  constructor(public http: ClientesService,private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private modalService: NgbModal) {
    this.datos_empresa=JSON.parse(localStorage.empresa);
     this.funcionesusuario=JSON.parse(this.datosusuario["funciones"]);
    this.general();
   }

   general(){
    
    this.http.getgeneral(this.datos_empresa["IDEmpresa"])
    .subscribe((resp)=>{
      this.estados=resp["estados"];
      this.grupos=resp["externos"];
    })
   }
  ngOnInit() {
    this.spinner.show();
    this.http.getall(this.datos_empresa["IDEmpresa"])
    .subscribe((resp)=>{
      if(resp["ok"]!==false){
        this.clientes.limpiarlista();
        resp["ok"].forEach(element => {
          this.clientes.addcliente(element);
        });
        
      }
     this.Listclientes=this.clientes.getList();
      console.log()
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
      console.log(error)
    })
  }
 
  buscarcliente(){
    this.Listclientes=this.clientes.buscarpalabra(this.palabra);
  }
  
  add(modal){
  }
  export(){
  }
  qr(moda,usuario){

    this.codeqr=usuario;
    this.modalService.open(moda,{ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  open(moda,id?){
    if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
    this.cliente.Apellidos="";
    this.cliente.Correo="";
    this.cliente.Direccion="";
    this.cliente.EEstado="";
    this.cliente.Estado="";
    this.cliente.IDCliente="";
    this.cliente.IDConfig="";
    this.cliente.IDEmpresa=this.datos_empresa["IDEmpresa"];
    this.cliente.Municipio="";
    this.cliente.Nombre="";
    this.cliente.NombreComercial="";
    this.cliente.Pais="";
    this.cliente.Puesto="";
    this.cliente.RFC="";
    this.cliente.TPersona="";
    this.cliente.Tel="";
    this.cliente.Usuario="";
    this.cliente.Actipass="1";
    this.cliente.Telcontact="";
    this.modalService.open(moda, {ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  //funcion para solicitar datos de un cliente
    requestuser(moda,id){
       if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
       this.spinner.show();
      this.http.getuser(id)
      .subscribe((resp)=>{
        this.spinner.hide();
        resp["ok"]!=false ? this.cliente=resp["ok"]:"";
        this.modalService.open(moda, {ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.spinner.hide();
      },(error)=>{  
         this.spinner.hide();
        console.log(error)
      })
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
  //funcion para dar de baja un cliente
  delete(Id,stado){
     if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
    console.log(Id,stado)
    this.spinner.show();
    this.http.update_status(Id,stado)
    .subscribe((resp)=>{
      this.ngOnInit();
    })
  }
  enviarform(){
     if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    if(this.cliente.IDCliente!=""){
      this.http.update(this.cliente)
      .subscribe((resp)=>{
        this.spinner.hide();
        $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
        
          this.ngOnInit();
      })
    }else{
      this.cliente.IDEmpresa=this.datos_empresa["IDEmpresa"];
      this.http.save(this.cliente)
      .subscribe(()=>{
        this.spinner.hide();
        $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Cliente Registrado...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
          this.ngOnInit();
      })
    }
    this.closemodel(this.modalclint);
  }
  closemodel(content){
    this.modalService.dismissAll(content);
  }
  close(){
     this.staticAlertClosed=false;
  }
  alertdele(id){
     if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    let datos={IDCliente:id}
    this.http.numregistros_clie(datos)
    .subscribe((data)=>{
      console.log(data["ok"]);
      this.errorrfcSwal.text="Se eliminaran todos los resultados relacionados con este cliente/proveedor, realizados y recibidos, total de Registros: "+data["ok"]+".";
      this.spinner.hide();
      this.deleteclientid=id
       this.errorrfcSwal.show();
    })

  }
  borrarcliente(){
     if(this.funcionesusuario[4]==="0"){
      this.errorralert.show() 
      return;
    }
    this.spinner.show();
    var datos={IDCliente:this.deleteclientid}
    this.http.delete(datos)
    .subscribe((data)=>{
      this.ngOnInit();
    })
  }
}
