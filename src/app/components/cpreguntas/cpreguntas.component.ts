import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { PreguntasList } from 'src/app/class/preguntas-list';
import { PreguntasInterface } from 'src/app/models/pregunta-interface';
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {  SwalComponent } from '@toverux/ngx-sweetalert2';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-cpreguntas',
  templateUrl: './cpreguntas.component.html',
  styleUrls: ['./cpreguntas.component.scss']
})
export class CpreguntasComponent implements OnInit {
  // variables para las categorias de las preguntas
  categorias: any [] = [];
  preguntasbanco: any [] = [
    {pregunta: 'A las cuantas vueltas se echa un perro', IDPregunta: '5', Categoria: '50', Respuestas: [1, 2, 3, 6, 5]},
    {pregunta: 'A las cuantas vueltas se echa un gato', IDPregunta: '5', Categoria: '50', Respuestas: [8, 6, 5]},
    {pregunta: 'A las cuantas vueltas se echa un cochino', IDPregunta: '5', Categoria: '50', Respuestas: [8, 15, 3, 6, 5]},
    // tslint:disable-next-line:max-line-length
    {pregunta: 'A las cuantas vueltas se echa un puerco', IDPregunta: '5', Categoria: '50', Respuestas: ['un ves', 'Dos', 'tres', ' cuatro', 'cinco']}
];
  listapregunta: any [] = [];
  // asta aqui se termina

  public modeltags: any;
  tags: any = [];
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorralert') private errorralert: SwalComponent;

  posresplt: any[] = [];
  inputrespp = false;
  tipor = 'text';
  selectsn = true;
  pscin = false;
  lismulte = true;
  pageActual = 1;
  palabra: string;
  datosempresa: any[] = [];
  lista: any[] = [];
  listarespuestas: Observable<any>;
  listf = [];
  isCollapsed = true;
  posresp: string;
  alertterror: string;
  datosusuario: any[] = JSON.parse(localStorage.usuarioqval);
  funcionesusuario: any[] = [];
  staticAlertClosed = false;
  closeResult: string;
  pregunta: PreguntasInterface = {
    Estado: '',
    Forma: '',
    Frecuencia: '',
    IDEmpresa: '',
    IDPregunta: '',
    Nomenclatura: '',
    Peso: '',
    Pregunta: '',
    Respuesta: '',
  };
  lista_preguntas = new PreguntasList();
  deleteaskid = '';
  instance: any;
  // tslint:disable-next-line:max-line-length
  constructor(private http: PreguntasService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.datosempresa = JSON.parse(localStorage.empresa);
    this.funcionesusuario = JSON.parse(this.datosusuario['funciones']);
  }

  ngOnInit() {
    this.spinner.show();
    this.lista_preguntas.clearlist();
    this.http.getall(this.datosempresa['IDEmpresa'])
    .subscribe((resp) => {
      if (resp['ok'] !== false) {
        resp['ok'].forEach(element => {
            this.lista_preguntas.addask(element);
        });
      }
      this.lista = this.lista_preguntas.getlist();
      this.spinner.hide();
    });

  }
  buscarpregunta() {
    this.lista = this.lista_preguntas.busquedapalabra(this.palabra);
  }
  open(x, y) {
    if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    this.clear();
    this.modalService.open(x, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }
  cambiorespuesta(tr?) {
    if (this.pregunta.Forma === 'SI/NO') {
      this.limpiarlist();
      this.selectsn = false;
      this.inputrespp = true;
      this.posresplt = [{'val': 'SI'}, {val: 'NO'}];
    }
    if (this.pregunta.Forma === 'SI/NO/NA') {
      this.limpiarlist();
      this.selectsn = false;
      this.inputrespp = true;
      this.posresplt = [{'val': 'SI'}, {val: 'NO'}, {val: 'NA'}];
    }
    if (this.pregunta.Forma === 'SI/NO/NA/NS') {
      this.limpiarlist();
      this.selectsn = false;
      this.inputrespp = true;
      this.posresplt = [{'val': 'SI'}, {val: 'NO'}, {val: 'NA'}, {val: 'NS'}];
    }
    if (this.pregunta.Forma === 'SI/NO/NS') {
      this.limpiarlist();
      this.selectsn = false;
      this.inputrespp = true;
      this.posresplt = [{'val': 'SI'}, {val: 'NO'}, {val: 'NS'}];

    }
    // tslint:disable-next-line:max-line-length
    if (this.pregunta.Forma === 'DIAS' ||  this.pregunta.Forma === 'HORAS' || this.pregunta.Forma === 'MINUTOS' || this.pregunta.Forma === 'NUMERO') {
      this.limpiarlist();
      this.selectsn = true;
      this.inputrespp = false;
      this.tipor = 'number';
    }
    if (this.pregunta.Forma === 'AB') {
      this.limpiarlist();
      this.selectsn = true;
      this.inputrespp = true;
      this.tipor = 'text';
    }
    if (this.pregunta.Forma === 'ML' || this.pregunta.Forma === 'MLC') {
      if (tr === false) {
        this.listf = [];
      }
      this.pscin = true;
      this.lismulte = false;
    }
    if (this.pregunta.Forma === '') {
      this.pscin = false;
      this.lismulte = true;
    }
  }
  addrespr(e) {
    if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    const splt = '';
    if (e.key === 'Enter') {

      this.listf.push({label: this.posresp, index: this.listf.length});
      this.posresp = '';
      return this.listf;
      console.log(this.listf);
    }


    // $(".card#listmult").html("");
  }
  limpiarlist() {
    this.listf = [];
    this.pscin = false;
    this.lismulte = true;
  }
  removeposlist(id) {
    this.listf.splice(id, 1);
  }
  enviarform() {

    if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    if (this.pregunta.IDPregunta === '') {
      this.save();
    } else {
      this.update();
    }
  }
  save() {
    if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }

    this.pregunta.Estado = '1';
    this.pregunta.IDEmpresa = this.datosempresa['IDEmpresa'];
    if (this.pregunta.Forma === 'ML' || this.pregunta.Forma === 'MLC') {
     const ult = [];
      this.listf.forEach((els) => {
        ult.push(els.label);
      });
      this.pregunta.Respuesta = JSON.stringify(ult);
    }
    this.http.save(this.pregunta)
    .subscribe((res) => {
      if (res['ok'] === true) {
        // tslint:disable-next-line:max-line-length
        $('.alert-funciones').removeClass('alert-danger').addClass('alert-success').addClass('show').html(' <strong>Exito! </strong>Pregunta Registrada...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);
        this.clear();
        this.ngOnInit();
      } else {
        // tslint:disable-next-line:max-line-length
        $('.alert-funciones').addClass('show').html(' <strong>Error! </strong>' + res['error'] + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);

      }
    });
    console.log(this.pregunta);

  }
  clear() {
        this.pregunta.Estado = '';
        this.pregunta.IDEmpresa = '';
        this.pregunta.Forma = '';
        this.pregunta.Frecuencia = '';
        this.pregunta.IDPregunta = '';
        this.pregunta.Peso = '';
        this.pregunta.Respuesta = '';
        this.pregunta.Pregunta = '';
        this.limpiarlist();
  }
  update() {
     if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    if (this.pregunta.Forma === 'ML' || this.pregunta.Forma === 'MLC') {
      const ult = [];
       this.listf.forEach((els) => {
         ult.push(els.label);
       });
       this.pregunta.Respuesta = JSON.stringify(ult);
     }
    this.http.update(this.pregunta)
    .subscribe((res) => {
      if (res['ok'] === true) {
        // tslint:disable-next-line:max-line-length
        $('.alert-funciones').removeClass('alert-danger').addClass('alert-success').addClass('show').html(' <strong>Exito! </strong>Datos Actualizados...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);
        this.clear();
        this.ngOnInit();
      } else {
        // tslint:disable-next-line:max-line-length
        $('.alert-funciones').addClass('show').html(' <strong>Error! </strong>' + res['error'] + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(() => {
          $('.alert-funciones').removeClass('show');
        }, 4000);

      }
    });
  }


  export() {

  }
  requestask(x, y) {
     if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    this.pregunta = this.lista_preguntas.busquedapregunta(y);
    if (this.pregunta.Forma === 'ML' || this.pregunta.Forma === 'MLC' ) {
     const lr = JSON.parse(this.pregunta.Respuesta);
     lr.forEach((elemnt) => {
      this.listf.push({label: elemnt, index: this.listf.length});
     });
    }
    this.cambiorespuesta(true);
    this.modalService.open(x, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }
  delete(x, y) {
     if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    this.spinner.show();
      this.http.delete(x, y)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  close() {
     this.staticAlertClosed = false;
  }
  alertdele(id) {
    if (this.funcionesusuario[6] === '0') {
       this.errorralert.show();
      return;
    }
    this.spinner.show();
    const datos = {IDPregunta: id};
    this.http.numregistros(datos)
    .subscribe((data) => {
      console.log(data['ok']);
      // tslint:disable-next-line:max-line-length
      this.errorrfcSwal.text = 'Se eliminaran todos los resultados relacionados con esta pregunta, realizados y recibidos, total de Registros: ' + data['ok'] + '.';
      this.spinner.hide();
      this.deleteaskid = id;
       this.errorrfcSwal.show();
    });
  }
  borrarpregunta() {
    this.spinner.show();
    const datos = {IDPregunta: this.deleteaskid, IDEmpresa: this.datosempresa['IDEmpresa']};
    this.http.borrar(datos)
    .subscribe((data) => this.ngOnInit());
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  selectedItem(ef) {
    this.modeltags = '';
    this.tags.push(ef['item']);
  }
  // funcion para pasar la pregunta a la nueva lista
  
  droper(event: CdkDragDrop< any []>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
