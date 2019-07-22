import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ConectService } from '../../services/conect.service';
import { GruposList } from '../../class/grupos-list';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import swal from 'sweetalert2';

export const grupointernos = new GruposList();
export const grupoexternos = new GruposList();
export const todosgrupos = new GruposList();
@Component({
  selector: 'app-cgrupos',
  templateUrl: './cgrupos.component.html',
  styleUrls: ['./cgrupos.component.scss']
})

export class CgruposComponent implements OnInit {
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorralert') private errorralert: SwalComponent;
  @ViewChild('datsgrups') private datsgrups;
  dempresa: any[] = [];
  pageActual = 1;
  pageActual2 = 1;
  paginatodos = 1;
  todoslosgrupos: any[] = [];
  internos: any[] = [];
  externos: any[] = [];
  palinterno: string;
  palexterno: string;
  closeResult: string;
  upnmbre: string;
  uptipo: string;
  formdatsg: FormGroup;
  deletegrup = '';
  todos = '';
  model: any = {};
  datosusuario: any = [];
  funcionesusuario: any = [];
  palabra = '';
  selected = '';
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private location: Location, public router: Router, private http: ConectService, private spinner: NgxSpinnerService) {

     this.datosusuario = JSON.parse(localStorage.usuarioqval);
     this.funcionesusuario = JSON.parse(this.datosusuario['funciones']);
     this.model['grupo'] = '';
    this.palinterno = '';
    this.palexterno = '';
    this.formdatsg = this.formBuilder.group({
        nombregrupo: [this.upnmbre, Validators.required],
        tipog: [this.uptipo, Validators.required],
        grupo: ['']
    });
    this.dempresa = JSON.parse(localStorage.empresa);

    this.obtener_grupos(this.dempresa['IDEmpresa']);

   }

  ngOnInit() {

  }

  obtener_grupos(empresa) {
    this.spinner.show();
    this.http.getgrupos(empresa)
    .subscribe((res) => {
      grupoexternos.limpiarlista();
      grupointernos.limpiarlista();
      todosgrupos.limpiarlista();
      if (res['internos'] !== false) {
        res['internos'].forEach(interno => {
          grupointernos.agregarGrupo(interno);
          todosgrupos.agregarGrupo(interno);
        });
      }
      if (res['externos'] !== false) {
        res['externos'].forEach(externo => {
          todosgrupos.agregarGrupo(externo);
          grupoexternos.agregarGrupo(externo);
        });
      }
      this.internos = grupointernos.getLista();
      this.externos = grupoexternos.getLista();
      this.todoslosgrupos = todosgrupos.getLista();
      this.spinner.hide();
    }, (erro) => {
      this.spinner.hide();
      console.log(erro);
    });
  }
  buscartodos() {
    console.log(this.todos);
    this.todoslosgrupos = todosgrupos.busquedapalabra(this.todos);
  }
  buscarinterno(event) {
    // console.log(this.palinterno);
    this.internos = grupointernos.busquedapalabra(this.palinterno);
  }
  buscarexterno(event) {
    this.externos = grupoexternos.busquedapalabra(this.palexterno);
    console.log(this.externos);
  }

  eliminar(grupo, status) {
    if (this.funcionesusuario[1] === '0') {
      this.errorralert.show();
      return;
    }
    this.spinner.show();
    const datos = {grupo, status};
    this.http.updatestatusgrupo(datos)
    .subscribe((pass) => {
       this.obtener_grupos(this.dempresa['IDEmpresa']);
    }, (error) => {
      console.log(error);
    });
    console.log(datos);
  }
  open(content, id?, tipo?) {
   if (this.funcionesusuario[1] === '0') {
      this.errorralert.show();
      return;
    }
    let datos;
    if (tipo === 'E') {
       datos = grupoexternos.getGrupo(id);
    }
    if (tipo === 'I') {
      datos = grupointernos.getGrupo(id);
    }
    if (tipo !== 'N') {
      this.model['nombregrupo'] = datos['Nombre'];
      this.model['tipog'] = datos['Tipo'];
      this.model['grupo'] = id;
    } else {
      this.upnmbre = '';
      this.uptipo = '';
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
closemodel(content) {
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
  enviarform() {
    if (this.funcionesusuario[1] === '0') {
      this.errorralert.show();
      return;
    }
    if (this.model['tipog'] === undefined) {
      swal('Error', 'Selecciona un tipo de grupo para continuar.', 'error');
      return ;
    }
    this.spinner.show();
    if (this.model['grupo'] !== '') {
      this.http.updategrupo(this.model)
      .subscribe((pass) => {
        this.model = {};
        this.model['grupo'] = '';
        this.obtener_grupos(this.dempresa['IDEmpresa']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.model['grupo'] = this.dempresa['IDEmpresa'];
      this.http.addgroup(this.model)
      .subscribe((pass) => {
        this.model = {};
        this.model['grupo'] = '';
        this.obtener_grupos(this.dempresa['IDEmpresa']);
      }, (erro) => {
        this.spinner.hide();
      });

    }
    this.closemodel(this.datsgrups);

  }
  alertdele(id) {
    this.deletegrup = id;
    this.errorrfcSwal.show();
  }
  borrargrupo() {
    if (this.funcionesusuario[1] === '0') {
      this.errorralert.show();
      return;
    }
     this.spinner.show();
    const datos = {IDGrupo: this.deletegrup};
    this.http.delete_grupo(datos)
    .subscribe((pass) => {
       this.spinner.hide();
       this.obtener_grupos(this.dempresa['IDEmpresa']);

    });
  }
  buscar_grupo() {
    this.todoslosgrupos = todosgrupos.busquedapalabra(this.palabra);
  }
  filtrogrupo() {
    this.todoslosgrupos = todosgrupos.buscar_tipo(this.selected);
  }

}
