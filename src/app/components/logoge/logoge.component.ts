import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../class/empresa';
import {Usuario} from '../../class/usuario';
import { ConectService } from '../../services/conect.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logoge',
  templateUrl: './logoge.component.html',
  styleUrls: ['./logoge.component.scss']
})
export class LogogeComponent implements OnInit {
  usuario:Usuario=null;
  empresa:Empresa=null;
  nombreus:string;
  apellidos:string;
  puesto:string;
  correo:string;
  razon_social:string;
  nombre_comercial:string;
  r_f_c:string;
  nempleados:string;
  perfile:string;
  nousaurios:string;
  noclientes:string;
  nocuestionario:string;
  nopreguntas:string;
  nogrupo:string;
  closeResult: string;
  tem:string;
  facanual:string
  tel:string;
  municipio:string;
  colonia:string;
  calle:string;
  cp:string;
  estado:string;
  Estados:any[]=[];
  FacAnual:any[]=[];
  NoEmpleados:any[]=[];
  TipoEmpresa:any[]=[];
  Logoempresa:string;
  Banner:string;
  filebanner:File=null;
  filelogo:File=null;
  rut:string;
  registerForm: FormGroup;
  submitted = false;
  constructor(private router:Router,private formBuilder: FormBuilder,private modalService: NgbModal,private http:ConectService,private spinner: NgxSpinnerService) { 
    this.rut=environment.urlserverp;
    this.cargarStorage();
    this.registerForm = this.formBuilder.group({
      razon_social:[this.razon_social,Validators.required],
      nombre_comercial:[this.nombre_comercial,Validators.email],
      rfc:[this.r_f_c,Validators.required],
      tem:[this.tem,Validators.required],
      nempleados:[this.nempleados,Validators.required],
      facanual:[this.facanual,Validators.required],
      tel:[this.tel,Validators.required],
      perfile:[this.perfile],
      calle:[this.calle],
      municipio:[this.municipio],
      colonia:[this.colonia],
      estado:[this.estado],
      cp:[this.cp],
      empresa:[this.empresa.getID()]
    })
  }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg' }).result.then((result) => {
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
  cargarStorage(){
    this.spinner.show();
    if(localStorage.usuarioqval){
      let dusuarios=JSON.parse(localStorage.usuarioqval);
      this.usuario=new Usuario(dusuarios["Id"],dusuarios["nombre"],dusuarios["apellido"],dusuarios["empresa"],dusuarios["Puesto"],dusuarios["Config"],dusuarios["Usuario"],dusuarios["Correo"],dusuarios["funciones"]);
      let dempresa=JSON.parse(localStorage.empresa);
      this.empresa=new Empresa(dempresa["IDEmpresa"],dempresa["Rason_Social"],dempresa["Nombre_Comercial"],dempresa["RFC"],dempresa["Tipo_Empresa"],dempresa["NoEmpleados"],dempresa["Facturacion_Anual"],dempresa["Perfil"],dempresa["CalleyNumero"],dempresa["Colonia"],dempresa["Logo"],dempresa["Municipio"],dempresa["Cp"],dempresa["Estado"],dempresa["Telefono"],dempresa["Banner"]);
      this.Banner=this.empresa.getBanner();
      this.Logoempresa=this.empresa.getLogo();
      this.nombreus=this.usuario.getNombre();
      this.apellidos=this.usuario.getApellido();
      this.puesto=this.usuario.getPuesto();
      this.correo=this.usuario.getCorreo();
      this.razon_social=this.empresa.getRazon();
      this.nombre_comercial=this.empresa.getNombreC();
      this.nempleados=this.empresa.getNoEm();
      this.perfile=this.empresa.getPerfil();
      this.r_f_c=this.empresa.getrfc();
      this.facanual=this.empresa.getFac();
      this.tem=this.empresa.getTipo();
      this.calle=this.empresa.getCalle();
      this.municipio=this.empresa.getMun();
      this.estado=this.empresa.getEstado();
      this.tel=this.empresa.getTelefono();
      this.cp=this.empresa.getCp();
      this.colonia=this.empresa.getColonia();
      this.http.panel(this.empresa.getID())
      .subscribe((resp)=>{
        this.nousaurios=resp["NoUsuarios"]["NumUsuarios"];
        this.noclientes=resp["NoCliente"]["numclientes"];
        this.nocuestionario=resp["NoCuestionario"]["numcuestionarios"]
        this.nopreguntas=resp["NoPregunta"]["numpregunta"]
        this.nogrupo=resp["NoGrupo"]["numgrupo"];
        this.Estados=resp["estados"];
        this.FacAnual=resp["Facturacion"];
        this.NoEmpleados=resp["NoEmpleados"];
        this.TipoEmpresa=resp["tipos_empresa"];
        console.log(this.FacAnual);
        this.spinner.hide();
      },(error)=>{
        this.spinner.hide();
        console.log(error);
      })
    }
  }
  cargabanner(event){
    this.filebanner=<File>event.target.files[0];
  }
  cargalogo(event){
    this.filelogo=<File>event.target.files[0];
    
  }
  updatedataus(){
    this.spinner.show();
    const form=new FormData();
    var logo=this.Logoempresa;
    var banner=this.Banner;
    if(this.filebanner!==null){
      form.append("banner",this.filebanner,this.filebanner.name)
      banner=this.filebanner.name;
    }
    if(this.filelogo){
     form.append("logo",this.filelogo,this.filelogo.name);
     logo=this.filelogo.name;
   }
   form.append("empresa",this.empresa.getID());
   form.append("nombreus",this.nombreus);
   form.append("apellido",this.apellidos);
   form.append("correo",this.correo);
   form.append("puesto",this.puesto);
   
   form.append("num",this.usuario.getId());
   this.http.updateusu(form)
   .subscribe((pass)=>{
     if(pass["ok"]===1){
      this.Banner=banner;
      this.Logoempresa=logo;
      this.empresa.updateLogo(logo);
      this.empresa.updateBanner(banner);
      this.usuario.updateNombre(this.nombreus);
      this.usuario.updateApellido(this.apellidos);
      this.usuario.updatePuesto(this.puesto);
      this.usuario.updateCorreo(this.correo);
      this.guardarUsuario(".alert-datosus");
    }
  },(error)=>{
    this.spinner.hide();
    $(".alert-datosus").addClass("show").html(' <strong>Error! </strong>No se puede conectar con el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    setTimeout(()=>{
      $(".alert-datosus").removeClass("show");
    },4000)

  })
 }
 guardarUsuario(cade){
  this.spinner.hide();
  $(cade).removeClass("alert-danger").addClass("alert-success").addClass("show").html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  setTimeout(()=>{
    $(cade).removeClass("show");
  },4000)
  localStorage.setItem("usuarioqval",JSON.stringify(this.usuario));
  localStorage.setItem("empresa",JSON.stringify(this.empresa));
}
guardar_datos_empresa(event){
  if(this.usuario.getfunciones()[1]=="0"){
    this.alerterrordempresa('No esta autorizado para modificar los datos de la empresa');     
    return;
  }
  
  this.empresa.updateRazon(event.value["razon_social"]);
  this.empresa.updateNoEm(event.value["nombre_comercial"]);
  this.empresa.updaterfc(event.value["rfc"]);
  this.empresa.updateTipo(event.value["tem"]);
  this.empresa.updateNoEm(event.value["nempleados"]);
  this.empresa.updatePerfil(event.value["perfile"]);
  this.empresa.updateTelefono(event.value["perfile"]);
  this.empresa.updateCalle(event.value["calle"]);
  this.empresa.updateColonia(event.value["colonia"]);
  this.empresa.updateEstado(event.value["estado"]);
  this.empresa.updateCp(event.value["cp"]);
  this.empresa.updateFac(event.value["facanual"]);
  this.http.updateempresa(event.value)
  .subscribe((pass)=>{
    
    if(pass["ok"]===1){
      this.empresa.updateRazon(this.razon_social);
      this.guardarUsuario(".alert-datosgen");
    }else{
      this.spinner.hide();
      this.alerterrordempresa('No se puede conectar con el servidor.'); 
    }     
  },(error)=>{
    console.log(error);
  })

}
alerterrordempresa(text){
 $(".alert-datosgen").addClass("show").html(' <strong>Error! </strong>'+text+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
 setTimeout(()=>{
  $(".alert-datosgen").removeClass("show");
},4000)
}
goto(ir){
  this.router.navigateByUrl('/'+ir);
}
}
