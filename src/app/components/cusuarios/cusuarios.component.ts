import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosList } from '../../class/usuarios-list';
import { userInterface } from '../../models/user-interface'
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';

import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2'



@Component({
  selector: 'app-cusuarios',
  templateUrl: './cusuarios.component.html',
  styleUrls: ['./cusuarios.component.scss']
})
export class CusuariosComponent implements OnInit {
   @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
    @ViewChild('errorralert') private errorralert: SwalComponent;
  closeResult: string;
  datosempresa:any[]=[];
  pageActual:number=1;
  palabra:string="";
  listausuarios:any[]=[];
  formdatsu:FormGroup;
  fexpres:any;
  fresultados:any;
  fcuestionarios:any;
  fclientes:any;
  fusarios:any;
  fgrupos:any;
  fdatos:any;
  fcalifica:any;
  form:FormGroup;
  usuariofun:string;
  alerttsucces:string;
  alertterror:string;
  datosusuario:any[]=JSON.parse(localStorage.usuarioqval);
  funcionesusuario:any[]=[];
  staticAlertClosed = false;
  codeqr:string="";
  public  numregostris:any;
  deleteuserid:string="";

  public grupos:any[]=[];
  public user:userInterface={
    Id:"",
    Nombre:"",
    Apellidos:"",
    Correo:"",
    Usuario:"",
    Puesto:"",
    Empresa:"",
    Configuracion:"",
    functions:""
  };
  orderForm: FormGroup;
  public  ListaUsuarios= new UsuariosList();
  public orders = [
    { id: 0, label: 'Calificar en Qval',name:"fcalifica",checado:false },
    { id: 1, label: 'Configuración de datos de empresa',name:"fdatos",checado:false  },
    { id: 2, label: 'Acciones dentro de Grupos',name:"fgrupos",checado:false  },
    { id: 3, label: 'Acciones dentro de Usuarios' ,name:"fusarios",checado:false },
    { id: 4, label: 'Acciones dentro de Clientes',name:"fclientes",checado:false  },
    { id: 4, label: 'Acciones dentro de  Informes',name:"finformes",checado:false  },
    { id: 5, label: 'Acciones dentro de Cuestionarios',name:"fcuestionarios",checado:false  },
    { id: 6, label: 'Acciones dentro de Resultados',name:"fresultados",checado:false  },
    { id: 7, label: 'Carga Exprés',name:"fexpres" ,checado:false }
  ];
  constructor(private spinner: NgxSpinnerService,private http:UsuariosService,private formBuilder: FormBuilder,private modalService: NgbModal) { 
   
    this.datosempresa=JSON.parse(localStorage.empresa);
    this.funcionesusuario=JSON.parse(this.datosusuario["funciones"]);
    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true); 
    this.form = this.formBuilder.group({
      orders: new FormArray(controls)
    })
  }
  
  ngOnInit() {
    this.spinner.show();
    this.http.getall(this.datosempresa["IDEmpresa"])
    .subscribe((pass)=>{ 
      if(pass["usuarios"]!=false){
        this.ListaUsuarios.limpiarlista();
        pass["usuarios"].forEach(usuario=>{
        this.ListaUsuarios.agregarUsuario(usuario);
        })
      }
      this.listausuarios=this.ListaUsuarios.getLista();
      if(pass["grupos"]!=false){
              this.grupos=pass["grupos"];
      }
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
    })
  }
  
  buscarusuario(){
    this.listausuarios=this.ListaUsuarios.busquedapalabra(this.palabra);
  }
  enviarform(){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
    this.spinner.show();
    if(this.user.Id===""){
      this.user.Empresa=this.datosempresa["IDEmpresa"];
      this.http.saveUser(this.user)
      .subscribe((resp)=>{
        if(resp["ok"]===null){
          this.closemodel("datsus");
          this.ngOnInit();
        }else{
          console.log(resp["ok"]);
        }
        
      })  
    } else{
      this.spinner.show();
      this.http.update(this.user)
      .subscribe((resp)=>{
        if(resp["ok"]===true){
          this.closemodel("datsus");
          this.ngOnInit();
        }
      })
    }
  }
  
  export(){

  }
  addfunciones(id,modal){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }    let funciones:any=this.ListaUsuarios.getFunciones(id);
    this.usuariofun=id;
    var bandera;
    funciones=JSON.parse(funciones);
    funciones.forEach((funcion,i)=>{
        funcion=="1"?  bandera=true :bandera=false;

        this.orders[i]["checado"]=bandera;
        
    })

    //console.log(funciones);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title',centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }

  qr(moda,usuario){

    this.codeqr=usuario;
    this.modalService.open(moda,{ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  delete(id,state){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
    this.spinner.show();
    this.http.deleteuser(id,state)
    .subscribe((resp)=>(this.ngOnInit()));
  }
  closemodel(content){
    this.modalService.dismissAll(content);
  }
  open(content,id?) {
    
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
   
    let datosus:any;
    if(id!==""){
     datosus=this.ListaUsuarios.getUsuario(id);
     this.user.Id=id;
     this.user.Nombre=datosus["nombre"];
     this.user.Apellidos=datosus["apellido"];
     this.user.Puesto=datosus["Puesto"];
     this.user.Correo=datosus["Correo"];
     this.user.Usuario=datosus["Usuario"];
     this.user.Configuracion=datosus["Config"];
     this.user.functions=datosus["funciones"];
    }else{
      this.user.Id="";
      this.user.Nombre="";
      this.user.Apellidos="";
      this.user.Puesto="";
      this.user.Correo="";
      this.user.Usuario="";
      this.user.Configuracion="";
      this.user.functions="";
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  changefunt(e){
    this.orders[e.target.name]["checado"]=e.target.checked;
  }
  savefunciones(){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
    let dt=[];
  this.orders.forEach((ops)=>{
    if(ops["checado"]===true){
      dt.push("1")
    }else{
      dt.push("0")
    }
  })
  
  let prv=JSON.stringify(dt);
  this.spinner.show();
  this.http.updatefunction(this.usuariofun,prv)
  .subscribe((resp)=>{
    this.spinner.hide();
    $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
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

    console.log(error);
  })
  }
  close(){
     this.staticAlertClosed=false;
  }
  alertdele(id){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
    this.spinner.show();
    let datos={IDUsuario:id}
    this.http.numregistros_user(datos)
    .subscribe((data)=>{
      console.log(data["ok"]);
      this.errorrfcSwal.text="Se eliminaran todos los resultados relacionados con este usuario tanto realizados y recibidos, total de Registros: "+data["ok"]+".";
      this.spinner.hide();
      this.deleteuserid=id
       this.errorrfcSwal.show();
    })

    

  }
  borrarusuario(){
    if(this.funcionesusuario[3]==="0"){
      this.errorralert.show()   
      return;
    }
    this.spinner.show();
    console.log(this.deleteuserid)
    let datos={IDUsuario:this.deleteuserid}
   this.http.delete_user(datos)
    .subscribe((pass)=>{
       this.spinner.hide();
       this.ngOnInit();

    })
  }
}
