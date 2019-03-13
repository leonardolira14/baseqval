import { Component, OnInit,ViewChild } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service'
import { PreguntasList } from 'src/app/class/preguntas-list';
import { PreguntasInterface } from 'src/app/models/pregunta-interface';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/internal/Observable';

import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2' 


@Component({
  selector: 'app-cpreguntas',
  templateUrl: './cpreguntas.component.html',
  styleUrls: ['./cpreguntas.component.scss']
})
export class CpreguntasComponent implements OnInit {
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorralert') private errorralert: SwalComponent;
  posresplt:any[]=[];
  inputrespp:boolean=false;
  tipor:string="text"
  selectsn:boolean=true;
  pscin:boolean=false;
  lismulte:boolean=true;
  pageActual:number=1;
  palabra:string;
  datosempresa:any[]=[];
  lista:any[]=[];
  listarespuestas:Observable<any>;
  listf=[];
  posresp:string;
  alertterror:string;
  datosusuario:any[]=JSON.parse(localStorage.usuarioqval);
  funcionesusuario:any[]=[];
  staticAlertClosed = false;
  closeResult: string;
  pregunta:PreguntasInterface={
    Estado:"",
    Forma:"",
    Frecuencia:"",
    IDEmpresa:"",
    IDPregunta:"",
    Nomenclatura:"",
    Peso:"",
    Pregunta:"",
    Respuesta:"",
  }
  lista_preguntas= new PreguntasList();
  deleteaskid:string="";
  constructor(private http:PreguntasService,private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private modalService: NgbModal) { 
    this.datosempresa=JSON.parse(localStorage.empresa);
    this.funcionesusuario=JSON.parse(this.datosusuario["funciones"]);
  }
  
  ngOnInit() {
    this.spinner.show();
    this.lista_preguntas.clearlist();
    this.http.getall(this.datosempresa["IDEmpresa"])
    .subscribe((resp)=>{
      if(resp["ok"]!=false){
        resp["ok"].forEach(element => {
            this.lista_preguntas.addask(element);
        });
      }
      this.lista=this.lista_preguntas.getlist();
      this.spinner.hide();
    })
    
  }
  buscarpregunta(){
    this.lista=this.lista_preguntas.busquedapalabra(this.palabra);
  }
  open(x,y){
    if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    this.clear()
    this.modalService.open(x,{ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' });
  }
  cambiorespuesta(tr?){
    let control;
    if(this.pregunta.Forma==="SI/NO"){
      this.limpiarlist();
      this.selectsn=false;
      this.inputrespp=true;
      this.posresplt=[{"val":"SI"},{val:"NO"}];
    }
    if(this.pregunta.Forma==="SI/NO/NA"){
      this.limpiarlist();
      this.selectsn=false;
      this.inputrespp=true;
      this.posresplt=[{"val":"SI"},{val:"NO"},{val:"NA"}];
    } 
    if(this.pregunta.Forma==="SI/NO/NA/NS"){
      this.limpiarlist();
      this.selectsn=false;
      this.inputrespp=true;
      this.posresplt=[{"val":"SI"},{val:"NO"},{val:"NA"},{val:"NS"}];
    }
    if(this.pregunta.Forma==="SI/NO/NS"){
      this.limpiarlist();
      this.selectsn=false;
      this.inputrespp=true;
      this.posresplt=[{"val":"SI"},{val:"NO"},{val:"NS"}];
    
    }
    if(this.pregunta.Forma==="DIAS"||  this.pregunta.Forma==="HORAS" || this.pregunta.Forma==="MINUTOS" || this.pregunta.Forma==="NUMERO"){
      this.limpiarlist();
      this.selectsn=true;
      this.inputrespp=false;
      this.tipor="number";
    }
    if(this.pregunta.Forma==="AB"){
      this.limpiarlist();
      this.selectsn=true;
      this.inputrespp=true;
      this.tipor="text";
    }
    if(this.pregunta.Forma==="ML" || this.pregunta.Forma==="MLC"){
      if(tr==false){
        this.listf=[];
      }
      this.pscin=true;
      this.lismulte=false;
    }
    if(this.pregunta.Forma===""){
      this.pscin=false;
      this.lismulte=true;
    }
  }
  addrespr(e){
    if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    var splt="";
    if(e.key==="Enter"){
      
      this.listf.push({label:this.posresp,index:this.listf.length});
      this.posresp="";
      return this.listf;
      console.log(this.listf)
    }
    
   
    //$(".card#listmult").html("");
  }
  limpiarlist(){
    this.listf=[];
    this.pscin=false;
    this.lismulte=true;
  }
  removeposlist(id){
    this.listf.splice(id,1);
  }
  enviarform(){
    
    if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    if(this.pregunta.IDPregunta===""){
      this.save();
    }else{
      this.update();
    }
  }
  save(){
    if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    
    this.pregunta.Estado="1";
    this.pregunta.IDEmpresa=this.datosempresa["IDEmpresa"];
    if(this.pregunta.Forma=="ML" || this.pregunta.Forma=="MLC"){
     var ult=[];
      this.listf.forEach((els)=>{
        ult.push(els.label)
      })
      this.pregunta.Respuesta=JSON.stringify(ult);
    }
    this.http.save(this.pregunta)
    .subscribe((res)=>{
      if(res["ok"]===true){
        $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Pregunta Registrada...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
        this.clear()
        this.ngOnInit();
      }else{
        $(".alert-funciones").addClass("show").html(' <strong>Error! </strong>'+res["error"]+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)

      }
    })
    console.log(this.pregunta);

  }
  clear(){
        this.pregunta.Estado="";
        this.pregunta.IDEmpresa="";
        this.pregunta.Forma="";
        this.pregunta.Frecuencia="";
        this.pregunta.IDPregunta="";
        this.pregunta.Peso="";
        this.pregunta.Respuesta="";
        this.pregunta.Pregunta="";
        this.limpiarlist();
  }
  update(){
     if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    if(this.pregunta.Forma=="ML" || this.pregunta.Forma=="MLC"){
      var ult=[];
       this.listf.forEach((els)=>{
         ult.push(els.label)
       })
       this.pregunta.Respuesta=JSON.stringify(ult);
     }
    this.http.update(this.pregunta)
    .subscribe((res)=>{
      if(res["ok"]===true){
        $(".alert-funciones").removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)
        this.clear()
        this.ngOnInit();
      }else{
        $(".alert-funciones").addClass("show").html(' <strong>Error! </strong>'+res["error"]+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-funciones").removeClass("show");
        },4000)

      }  
    })
  }


  export(){

  }
  requestask(x,y){
     if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    this.pregunta=this.lista_preguntas.busquedapregunta(y);
    if(this.pregunta.Forma=="ML" || this.pregunta.Forma=="MLC" ){
     var lr=JSON.parse(this.pregunta.Respuesta);
     lr.forEach((elemnt)=>{
      this.listf.push({label:elemnt,index:this.listf.length});
     })
    }
    this.cambiorespuesta(true)
    this.modalService.open(x,{ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg' });
  }
  delete(x,y){
     if(this.funcionesusuario[6]==="0"){
       this.errorralert.show() 
      return;
    }
    this.spinner.show()
      this.http.delete(x,y)
      .subscribe(()=>{
        this.ngOnInit();
      })
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
    let datos={IDPregunta:id}
    this.http.numregistros(datos)
    .subscribe((data)=>{
      console.log(data["ok"]);
      this.errorrfcSwal.text="Se eliminaran todos los resultados relacionados con esta pregunta, realizados y recibidos, total de Registros: "+data["ok"]+".";
      this.spinner.hide();
      this.deleteaskid=id
       this.errorrfcSwal.show();
    })
  }
  borrarpregunta(){
    this.spinner.show();
    var datos={IDPregunta:this.deleteaskid,IDEmpresa:this.datosempresa["IDEmpresa"]}
    this.http.borrar(datos)
    .subscribe((data)=>this.ngOnInit());
  }
}
