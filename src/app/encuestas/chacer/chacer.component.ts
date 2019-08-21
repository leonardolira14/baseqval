import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { PreguntasService } from '../../services/preguntas.service';
import { CuestionariosService  } from '../../services/cuestionarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Observable, of } from 'rxjs';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-chacer',
  templateUrl: './chacer.component.html',
  styleUrls: ['./chacer.component.scss']
})
export class ChacerComponent implements OnInit {
  @ViewChild('modalpreguntas') private modalpreguntas;
  @ViewChild('modalnombrecuestionary') private modalnombrecuestionary;
  @ViewChild('namecatego') private namecatego;
  @ViewChild('stepper') stepper;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
   vista_cel = false;
   vista_tablet = false;
   vista_pc = true;
  public selectcatego = 'Todas las Categorias';
  public cmodalnotificaciones = false;
  public listnotif = [];
  cantidad_indicador: any;
  select_indicador_tipo = 'Selecciona';
  datosusuario = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  datosempresa = [];
  allcategorias = [];
  allcategoriastb = [];
  cmodalpreg = false;
  converterrespuesta = [];
  preguntasbanco: any [] = [];
  listpreg1 = [];
  listpreg2 = [];
  listapregunta = [];
  palabra = '';
  lista_general = [];
  model_cuestionario: any = {};
  perfilesInternos = [];
  perfilesExternos = [];
  cmodaledpreg = false;
  posible_tag = '';
  list_tags = [];
  visible_catego = true;
  visible_pregunta = false;
  palabra_catego = '';
  all_user = [];
  model_datos_pregunta = {};
  index_edit = '';
  indicador = false;
  minino_desliza = 0;
  maximo_desliza  = 0;
  public spiner = true;
  cmodaledguardarplantilla = false;
  tipo_vista = 'col-12';
  model_general: any = {} ;
  public lineChartData: Array<any> = [
    {data: [0], label: ''},
  ];
  public lineChartLabels: Array<any> = [0];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(247, 172, 67,0.2)',
      borderColor: 'rgba(247, 172, 67,1)',
      pointBackgroundColor: 'rgba(247, 172, 67,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(247, 172, 67,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public id_usuario_notificacion = '';
  public usuario_notificacion = '';
  public condicion_notificacion = 'sn';
  public indexaddnotificacion = 0;
  stateCtrl = new FormControl();
  filteredStates: Observable<any[]>;
  states: any[] = [];
  constructor(
    private params: ActivatedRoute,
    private httpcuestionarios: CuestionariosService,
    private route: Router,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private http: PreguntasService) {
    this.datosempresa = JSON.parse(localStorage.empresa);
    this.datosusuario = JSON.parse(localStorage.usuarioqval);

  }
  dividir_lsitas(array) {
    this.listpreg1 = [];
    this.listpreg2 = [];
    array.forEach((item, index) => {
      if (index % 2 === 1) {
         // tslint:disable-next-line:max-line-length

         this.listpreg1.push({Obligatoria: item.Obligatoria, Peso: item.Peso, Nomenclatura: item.Nomenclatura, IDEmpresa: item.IDEmpresa, IDCategoria: item.IDCategoria, Frecuencia: item.Frecuencia, IDPregunta: item.IDPregunta, Pregunta: item.Pregunta, Forma: item.Forma, Respuesta: item.Respuesta, Respuestas: this.callComponentMethodHere(item.Forma, item.Respuestas)});
      }
    });
   array.forEach((item, index) => {
    if (index % 2 !== 1) {
        // tslint:disable-next-line:max-line-length

        this.listpreg2.push({Obligatoria: item.Obligatoria, Peso: item.Peso, Nomenclatura: item.Nomenclatura, IDEmpresa: item.IDEmpresa, IDCategoria: item.IDCategoria, Frecuencia: item.Frecuencia, IDPregunta: item.IDPregunta, Pregunta: item.Pregunta, Forma: item.Forma, Respuesta: item.Respuesta, Respuestas: this.callComponentMethodHere(item.Forma, item.Respuestas)});
      }
    });
  }
   open_modal(modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title'} );
    }
  closemodel(content) {
    this.modalService.dismissAll(content);
    }
  ngOnInit() {
    this.spiner = true;
    if (this.params.snapshot.paramMap.get('encuesta') === 'N') {
      this.stepper.selectedIndex = 1;
      console.log(this.params.snapshot.paramMap.get('encuesta'));
    } else {
      const datosvar = {IDCuestionario: this.params.snapshot.paramMap.get('encuesta'), IDEmpresa: this.datosempresa['IDEmpresa']};
      this.httpcuestionarios.getdatos_encuesta(datosvar)
      .subscribe((resp) => {
       
        this.model_general = resp;
        const _lineChartData: Array<any> = new Array(this.lineChartData.length);
        let  _labels: Array<any> = new Array();
        _lineChartData[0] = { data: resp['grafica']['datos']['data'], label: resp['grafica']['datos']['label']};
        this.lineChartData = _lineChartData;
        _labels = resp['grafica']['labels'];
        this.chart.chart.config.data.labels = _labels;
        console.log(resp);
        this.listapregunta = this.model_general['lista_preguntas'];
        this.model_cuestionario['IDCuestionario'] = this.model_general['datos_cuestionario']['IDCuestionario'];
        this.model_cuestionario['Nombre'] = this.model_general['datos_cuestionario']['Nombre'];
        this.model_cuestionario['PEmisor'] = this.model_general['datos_Emisor']['IDGrupo'] + '-' + this.model_general['datos_Emisor']['Tipo'];
        this.model_cuestionario['PReceptor'] = this.model_general['datos_Receptor']['IDGrupo'] + '-' + this.model_general['datos_Receptor']['Tipo'];
        this.spiner = false;
      });
    }
    const datos = {IDEmpresa: this.datosempresa['IDEmpresa'] };
    
    this.http.getcategotia(datos)
    .subscribe((data) => {
      console.log(data);
      this.perfilesInternos = data['pinternos'];
      this.perfilesExternos = data['pexternos'];
      this.all_user = data['usuarios'];
      this.states = this.all_user;
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
      this.allcategorias = data['ok'];
      this.allcategoriastb = data['ok'];
      this.spiner = false;
    }, (error) => {
      this.spiner = false;
      swal('Error', error, 'error');
    });
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();
   return  this.states.filter(state => state.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  preguntas_por_categorias(idcategoria, nombre) {
    const datos = {IDCategoria: idcategoria};
    this.http.getcategoriask(datos)
    .subscribe((data) => {
      this.preguntasbanco = data['ok'];
      this.dividir_lsitas(data['ok']);
      this.selectcatego = nombre;
      this.cmodalpreg = true;
    }, (error) => {
      this.spiner = false;
      swal('Error', error, 'error');
    });
  }
  // funcion para pasar la pregunta a la nueva lista

  droper(event: CdkDragDrop< any []>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
     this.listapregunta.push(event.previousContainer.data[event.previousIndex]);
     this.revisanotficacion();
    }
  }
  revisanotficacion() {
    this.listapregunta.forEach(pregunta => {
      if (pregunta['listanotificaciones'] === undefined) {
        pregunta['listanotificaciones'] = [];
      }
    });
    console.log(this.listapregunta);
  }

  cambio_categoria(e) {
    console.log(e);
    let nombre =  '';
    if (e === 0) {
      nombre = 'Sin Categoria';
    } else {
      this.allcategorias.forEach((item) => {
        if (item.IDCategoria === e) {
          nombre = item.Nombre;
          return ;
        }
      });
    }
    this.preguntas_por_categorias(e, nombre);

  }
  callComponentMethodHere(item, respuestas) {
    let respuesta = [];
    if (item === 'SI/NO') {
      respuesta = ['SI', 'NO'];
    } else if (item === 'SI/NO/NA') {
      respuesta = ['SI', 'NO', 'NA'];
    } else if (item === 'SI/NO/NS') {
      respuesta = ['SI', 'NO', 'NS'];
    } else if ((item === 'ML') || (item === 'MLC' )) {
      respuesta = JSON.parse(respuestas);
    } else {
      respuesta = respuestas;
    }

    return respuesta;
  }

  delete_lista1(i) {
   this.listapregunta.splice(i, 1);
  }
  buscar_palabra() {
    let array = [];
    array = this.preguntasbanco.filter(item => item.Pregunta.toLocaleLowerCase().includes(this.palabra));
    this.dividir_lsitas(array);
  }
  cerrar_preguntas() {
    this.cmodalpreg = false;
  }
  add_cuestiopnario_lista() {
    this.cmodalpreg = false;
  }
  num_array(numero) {
    // tslint:disable-next-line:radix
    numero = parseInt(numero);
      const array = [];
    for (let i = 0; i < numero; i++) {
      array.push(i);
    }
    return  array;
  }
  editar_pregunta(id) {

    this.limpiar_pregunta();
    const copia = this.listapregunta.slice(id);

    this.index_edit = id;
    id = '';
    this.list_tags = [];
    this.model_datos_pregunta['Obligatoria'] = 'SI';
    this.model_datos_pregunta = copia[0];
    if (this.model_datos_pregunta['Forma'] === 'SI/NO/NS' || this.model_datos_pregunta['Forma'] === 'SI/NO/NA' || this.model_datos_pregunta['Forma'] === 'SI/NO' || this.model_datos_pregunta['Forma'] === 'ML' ||  this.model_datos_pregunta['Forma'] === 'MLC') {
      this.list_tags = this.model_datos_pregunta['Respuestas'];
    }
    if (this.model_datos_pregunta['Forma'] === 'DESLIZA') {
      this.maximo_desliza = this.model_datos_pregunta['Respuestas'][1];
      this.minino_desliza = this.model_datos_pregunta['Respuestas'][0];
    }

    this.indicador = this.model_datos_pregunta['indicador'];
    if (this.indicador) {
      this.select_indicador_tipo = this.model_datos_pregunta['detalleindicador'][0]['condicion'];
      this.cantidad_indicador = this.model_datos_pregunta['detalleindicador'][0]['cantidad'];
    }
    localStorage.setItem('datos_pregunta_respaldo', JSON.stringify(this.model_datos_pregunta));
    this.cmodaledpreg = true;
  }

  guardar_edicion() {

    if ((this.model_datos_pregunta['Forma'] ===  'ML') || (this.model_datos_pregunta['Forma'] === 'MLC')) {
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
    }
    if ((this.model_datos_pregunta['Forma'] ===  'START')) {
      this.model_datos_pregunta['Respuestas'] = Number(this.model_datos_pregunta['Respuestas']);
    }
    if (this.model_datos_pregunta['Forma'] ===  'DESLIZA') {
        this.model_datos_pregunta['Respuestas'] = [this.minino_desliza, this.maximo_desliza];
    }
    this.listapregunta[this.index_edit] = this.model_datos_pregunta;
    this.listapregunta[this.index_edit]['detalleindicador'][0]['condicion'] = this.select_indicador_tipo;
    this.listapregunta[this.index_edit]['detalleindicador'][0]['cantidad'] = this.cantidad_indicador;
    this.posible_tag = '';
    this.list_tags = [];
    this.model_datos_pregunta = {};
    this.model_datos_pregunta['Peso'] = 0;
    this.model_datos_pregunta['Frecuencia'] = '1V';
    this.model_datos_pregunta['Obligatoria'] = 'SI';
    this.cmodaledpreg = false;
    this.index_edit = '';
    this.minino_desliza = 0;
    this.maximo_desliza  = 0;
    this.indicador = false;
    this.select_indicador_tipo = 'Selecciona';
    this.cantidad_indicador = '';
    localStorage.removeItem('datos_pregunta_respaldo');
    swal('Exito!', 'Datos Actualizados', 'success');
  }
  copiar_pregunta(id) {
    const copia = this.listapregunta.slice(id);
    this.listapregunta.push(copia[0]);
  }
  eliminar_pregunta(id) {
    this.listapregunta.splice(id, 1);
  }
  editar_nombre() {
    this.open_modal(this.modalnombrecuestionary);
  }
  siguiente() {
    this.model_cuestionario['Cuestionario'] = this.listapregunta;
    this.model_cuestionario['IDEmpresa'] = this.datosempresa['IDEmpresa'];
    if (this.model_cuestionario['Nombre'] === undefined || this.model_cuestionario['Nombre'] === '') {
      swal('Error!', 'Ingresa un nombre para la encuesta', 'error');
    } else if (this.model_cuestionario['PEmisor'] === undefined || this.model_cuestionario['PEmisor'] === '') {
      swal('Error!', 'Ingresa un perfil Emisor', 'error');
    } else if (this.model_cuestionario['PReceptor'] === undefined || this.model_cuestionario['PReceptor'] === '') {
      swal('Error!', 'Ingresa un perfil Receptor', 'error');
    } else if (this.model_cuestionario['Cuestionario'] === undefined || this.model_cuestionario['Cuestionario'].length === 0) {
      swal('Error!', 'Ingresa al menos una pregunta a la encuesta', 'error');
    } else {
      this.stepper.selectedIndex = 2;
      console.log(this.model_cuestionario);
    }
  }
  guarda_posible(e) {
    if (e.key === 'Enter') {
      this.list_tags.push(this.posible_tag);
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
      this.posible_tag = '';
    }

  }
  eliminar_tag(i) {
    this.list_tags.splice(i, 1);
  }
  visible_opcion(opcion) {
    if (opcion === 'c') {
      this.visible_catego = true;
      this.visible_pregunta = false;
    } else if (opcion === 'p') {
      this.visible_catego = false;
      this.visible_pregunta = true;
    }
  }
  select_pregunta(tipo) {
    this.list_tags = [];
    this.maximo_desliza = 0;
    this.minino_desliza = 0;
    this.model_datos_pregunta = {};
    this.model_datos_pregunta['Forma'] = tipo;
    if ( tipo === 'SI/NO') {
      this.model_datos_pregunta['Respuestas'] = ['SI', 'NO'];
    } else if ( tipo === 'SI/NO/NA') {
      this.model_datos_pregunta['Respuestas'] = ['SI', 'NO', 'NA'];
    } else if ( tipo === 'SI/NO/NS') {
      this.model_datos_pregunta['Respuestas'] = ['SI', 'NO', 'NS'];
    }
    this.model_datos_pregunta['Peso'] = 0;
    this.model_datos_pregunta['Frecuencia'] = '1V';
    this.model_datos_pregunta['Obligatoria'] = 'SI';
    this.cmodaledpreg = true;
  }
  add_pregunta() {
    this.model_datos_pregunta['IDCategoria'] = 'N';
    if (this.model_datos_pregunta['Pregunta'] === undefined || this.model_datos_pregunta['Pregunta'] === '') {
      swal('Error!', 'Ingresa el texto de la pregunta.', 'error');
      return ;
    }
    if (this.model_datos_pregunta['Frecuencia'] === undefined || this.model_datos_pregunta['Frecuencia'] === '') {
      swal('Error!', 'Ingresa una Frecuencia parra esta pregunta', 'error');
      return ;
    // tslint:disable-next-line:max-line-length
    }
    if (this.model_datos_pregunta['Forma'] === 'AB' ||  this.model_datos_pregunta['Forma'] === 'FECHA' || this.model_datos_pregunta['Forma'] === 'HORA' ||  this.model_datos_pregunta['Forma'] === 'F/H') {
      this.adicionar_pregunta();
    }

    if ( this.model_datos_pregunta['Forma'] === 'NUMERO' ) {
        this.adicionar_pregunta();
    }
    if (this.model_datos_pregunta['Forma'] === 'START') {
      // tslint:disable-next-line:radix
      if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( parseInt(this.model_datos_pregunta['Respuestas']) > 10 )) {
        swal('Error!', 'Ingresa un valor para el numero de estrellas que se mostraran. (debe ser como máximo 10)', 'error');
      } else {
        this.adicionar_pregunta();
      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'SI/NO' || this.model_datos_pregunta['Forma'] === 'SI/NO/NA' || this.model_datos_pregunta['Forma'] === 'SI/NO/NS') {
       if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '')) {
        swal('Error!', 'Ingresa una respuesta valida', 'error');

      } else if (this.model_datos_pregunta['Respuesta'] === undefined || ( this.model_datos_pregunta['Respuesta'] === '') ) {
        if (this.indicador === true ) {
             swal('Error!', 'Ingresa una respuesta positiva, para poder cumplir las reglas de un indicador', 'error');
        } else{
          this.adicionar_pregunta();
        }
      }  else {
        if (this.model_datos_pregunta['Respuesta'] === 'SR' && this.indicador === true) {
          swal('Error!', 'Ingresa una respuesta positiva, para poder cumplir las reglas de un indicador', 'error');
        } else {
          this.adicionar_pregunta();
        }

      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'ML') {
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
      if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '') || ( this.model_datos_pregunta['Respuestas'].length === 0)) {
        swal('Error!', 'Ingresa al menos una respuesta', 'error');

      } else if (this.model_datos_pregunta['Respuesta'] === undefined || ( this.model_datos_pregunta['Respuestas'] === '') ) {
        swal('Error!', 'Ingresa una respuesta positiva o selecciona "Sin Respuesta"', 'error');
      } else {
        this.adicionar_pregunta();
      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'MLC') {
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
      if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '') || ( this.model_datos_pregunta['Respuestas'].length === 0)) {
        swal('Error!', 'Ingresa al menos una respuesta', 'error');
      }  else {
        this.adicionar_pregunta();
      }
      return ;
    }
     if (this.model_datos_pregunta['Forma'] === 'DESLIZA' ) {
      if ( this.minino_desliza === this.maximo_desliza) {
        swal('Error!', 'Ingresa un valor mìnimo y màximo para el control', 'error');
      } else if ( (this.minino_desliza > this.maximo_desliza) || (this.maximo_desliza < this.minino_desliza)) {
        swal('Error!', 'Ingresa un valor mìnimo y màximo para el control', 'error');
      } else {
        this.model_datos_pregunta['Respuestas'] = [this.minino_desliza, this.maximo_desliza];
        this.minino_desliza = 0;
        this.maximo_desliza = 0;
        this.adicionar_pregunta();
      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'CARGA' ) {
        if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '' ) ) {
          swal('Error!', 'Ingresa las intrucciones para carga del archivo.', 'error');
        } else {
          this.adicionar_pregunta();
        }
        return ;
    }
    }
    adicionar_pregunta() {
      if (this.indicador) {
        if (Number(this.model_datos_pregunta['Peso']) === 0) {
          swal('Error!', 'Para crear un indicador el peso de la pregunta debe ser mayor a 0.', 'error');
          return;
        }
        this.model_datos_pregunta['indicador'] = true;
        if (this.model_datos_pregunta['Forma'] === 'SI/NO/NS' || this.model_datos_pregunta['Forma'] === 'SI/NO/NA' || this.model_datos_pregunta['Forma'] === 'SI/NO' || this.model_datos_pregunta['Forma'] === 'ML' ||  this.model_datos_pregunta['Forma'] === 'MLC') {
          switch (this.model_datos_pregunta['Respuesta']) {
            case undefined:
                swal('Error!', 'Ingresa una respuesta correcta.', 'error');
                return;
            case 'SR':
                swal('Error!', 'Ingresa una respuesta correcta.', 'error');
                return;
          }
          this.model_datos_pregunta['detalleindicador'] = [this.model_datos_pregunta['Respuesta']];
        } else if (this.model_datos_pregunta['Forma'] === 'NUMERO' || this.model_datos_pregunta['Forma'] === 'FECHA' || this.model_datos_pregunta['Forma'] === 'HORA' || this.model_datos_pregunta['Forma'] === 'F/H' || this.model_datos_pregunta['Forma'] === 'START' || this.model_datos_pregunta['Forma'] === 'DESLIZA') {
          if (this.select_indicador_tipo === 'Selecciona') {
            swal('Error!', 'Selecciona una condicion para el indicador.', 'error');
            return;
          }
          switch (this.cantidad_indicador) {
            case undefined:
                swal('Error!', 'Ingresa una cantidad como condición para cumplir el indicador.', 'error');
                return;
            case '':
                swal('Error!', 'Ingresa una cantidad como condición para cumplir el indicador.', 'error');
                return;
            case '0':
              if (this.model_datos_pregunta['Forma'] === 'FECHA' || this.model_datos_pregunta['Forma'] === 'HORA' || this.model_datos_pregunta['Forma'] === 'F/H') {
                swal('Error!', 'Para este tipo de pregunta la cantidad del indicador no es valido', 'error');
                return;
              }
              if (this.model_datos_pregunta['Forma'] === 'START' && Number(this.cantidad_indicador) <= 0) {
                swal('Error!', 'Para este tipo de pregunta no se permiten los numeros negativos en la cantidad para el indicador', 'error');
                return;
              }
          }
          this.model_datos_pregunta['detalleindicador'] = [{'condicion': this.select_indicador_tipo, 'cantidad': this.cantidad_indicador}];
        } else {
          this.model_datos_pregunta['detalleindicador'] = [];
        }

      } else {
        this.model_datos_pregunta['indicador'] = false;
        this.model_datos_pregunta['detalleindicador'] = [];
      }
        this.model_datos_pregunta['listanotificaciones'] = [];
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
        this.indicador = false;
        this.select_indicador_tipo = 'Selecciona';
        this.cantidad_indicador = '';
        console.log(this.model_datos_pregunta);
    }

    limpiar_pregunta() {
      this.minino_desliza = 0;
      this.maximo_desliza  = 0;
      this.posible_tag = '';
      this.list_tags = [];
      this.model_datos_pregunta = {};
      this.model_datos_pregunta['Peso'] = 0;
      this.model_datos_pregunta['Frecuencia'] = '1V';
      this.model_datos_pregunta['Obligatoria'] = 'SI';
    }
    cancelar_pregunta_edit() {

      const datos = JSON.parse(localStorage.getItem('datos_pregunta_respaldo'));
      this.listapregunta[this.index_edit] = datos;
      localStorage.removeItem('datos_pregunta_respaldo');
      this.posible_tag = '';
      this.index_edit = '';
      this.list_tags = [];
      this.model_datos_pregunta = {};
      this.model_datos_pregunta['Peso'] = 0;
      this.model_datos_pregunta['Frecuencia'] = '1V';
      this.model_datos_pregunta['Obligatoria'] = 'SI';
      this.minino_desliza = 0;
      this.maximo_desliza  = 0;
      this.cmodaledpreg = false;
      this.indicador = false;
      this.select_indicador_tipo = 'Selecciona';
      this.cantidad_indicador = '';
    }
    limpiar_changer(e) {
      if ( e.value === 'SI/NO') {
        this.model_datos_pregunta['Respuestas'] = ['SI', 'NO'];
      } else if ( e.value === 'SI/NO/NA') {
        this.model_datos_pregunta['Respuestas'] = ['SI', 'NO', 'NA'];
      } else if ( e.value === 'SI/NO/NS') {
        this.model_datos_pregunta['Respuestas'] = ['SI', 'NO', 'NS'];
      } else {
        this.model_datos_pregunta['Respuesta'] = '';
        this.model_datos_pregunta['Respuestas'] = [];
      }
    }
    cancelar_todo() {
      Swal({
        title: '¿Estás seguro de cancelar?',
        text: 'Al cancelar los datos se liminaran',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy deacuerdo',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.route.navigateByUrl('encuestas');
        }
      });
    }
    guardar_borrador() {
      this.spiner = true;
      this.model_cuestionario['Cuestionario'] = this.listapregunta;
      const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], IDUsuario: this.datosusuario['Id'], Datos: JSON.stringify(this.model_cuestionario)};
     this.http.add_borrador(datos)
     .subscribe((data) => {
      this.spiner = false;
       if (data['ok'] === true) {
        swal('Exito!', 'Encuesta Guardada', 'success');
       } else {
        swal('Error', 'A currido un error vuelve a intentarlo.', 'error');
       }
     }, (error) => {
      this.spiner = false;
      swal('Error', error, 'error');
     });
    }
    guardar_plantilla() {

      if (this.listapregunta === [] ) {
        swal('Error!', 'Ingresa una lista de preguntas para continuar.', 'error');
      } else if (this.namecatego.nativeElement.value === '') {
        swal('Error!', 'Ingresa un nombre para continuar.', 'error');
      } else {
        this.spiner = true;
        const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], Datos: JSON.stringify(this.listapregunta), Nombre: this.namecatego.nativeElement.value};
       this.cmodaledguardarplantilla = false;
        this.http.add_plantilla(datos)
       .subscribe((data) => {
        this.spiner = false;
        this.allcategorias = data['ok'];
        this.allcategoriastb = data['ok'];
       });
      }

    }
    vista(tipo) {
      if (tipo === 'pc') {
          this.tipo_vista = 'col-12';
          this.vista_pc = true;
          this.vista_cel = false;
          this.vista_tablet = false;
      }
      if (tipo === 'tablet') {
        this.tipo_vista = 'col-9';
        this.vista_pc = false;
        this.vista_cel = false;
        this.vista_tablet = true;
      }
      if (tipo === 'cel') {
          this.tipo_vista = 'col-6';
          this.vista_pc = false;
          this.vista_cel = true;
          this.vista_tablet = false;
      }
    }
    guardar_encuesta() {
      this.spiner = true;
      this.model_cuestionario['Cuestionario'] = this.listapregunta;
      this.model_cuestionario['IDEmpresa'] = this.datosempresa['IDEmpresa'];
      this.httpcuestionarios.save(this.model_cuestionario)
      .subscribe((data) => {
        swal('Exito!', 'La encuesta ha sido registrada con exito', 'success');
        this.route.navigateByUrl('/encuestas');
      }, (error) => {
        this.spiner = true;
        swal('Error!', 'Error al contactar con el servidor', 'error');
      });
    }
    buscar_categoria() {
      console.log(this.palabra_catego);
        this.allcategoriastb = this.allcategorias.filter((item) => {
          return item.Nombre.toLocaleLowerCase().includes(this.palabra_catego.toLocaleLowerCase());
       });
    }
    notificaciones_pregunta(id) {

      this.indexaddnotificacion = id;
      this.cmodalnotificaciones = true;
      if ( typeof(this.listapregunta[this.indexaddnotificacion]['listanotificaciones'])  === 'string' ) {
        this.listnotif = JSON.parse(this.listapregunta[this.indexaddnotificacion]['listanotificaciones']);
      } else {
        this.listnotif = this.listapregunta[this.indexaddnotificacion]['listanotificaciones'];
      }
    }
    cerrar_modal_notificaciones() {
      this.indexaddnotificacion = 0;
      this.cmodalnotificaciones = false;
      this.listnotif = [];
    }
    displayFn(user?) {
      console.log(user);
      let nombre = '';
      if (user !== undefined && user !== null || user !== '') {
      this.all_user.forEach(usuario => {
          if (usuario.ID === user) {
           nombre = usuario.Nombre + ' ' + usuario.Apellidos;
           return false ;
          }
      });
      }
      return nombre;
    }

    addnotificacion() {
      if (this.condicion_notificacion === 'sn') {
        swal('Error', 'Selecciona una condición para continuar.', 'error');
        return;
      }
      const notificaciones = {usuario: this.id_usuario_notificacion, nombre: this.usuario_notificacion, condicion: this.condicion_notificacion};
      this.listnotif.push(notificaciones);
      // tslint:disable-next-line: no-unused-expression
      this.listapregunta[this.indexaddnotificacion]['listanotificaciones'] = this.listnotif;
      console.log(this.listapregunta[this.indexaddnotificacion]);
      this.id_usuario_notificacion = '';
      this.usuario_notificacion = '';
      this.condicion_notificacion = 'sn';
    }

    dameusuariohtml(id?) {
      console.log(this.all_user);
      let nombre = '';
      this.all_user.forEach(usuario => {
          if (usuario.ID === id) {
           nombre = usuario.Nombre + ' ' + usuario.Apellidos;
           return false ;
          }
      });
      this.id_usuario_notificacion = id;
      this.usuario_notificacion = nombre;
    }
    eliminarnotificaciond(index) {
      this.listnotif.splice(index, 1);
    }

}
