import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { PreguntasService } from '../../services/preguntas.service';
import { CuestionariosService  } from '../../services/cuestionarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Observable, of } from 'rxjs';
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
  // tslint:disable-next-line:max-line-length
  model_datos_pregunta = {};
  index_edit = '';

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

  constructor(private params: ActivatedRoute, private httpcuestionarios: CuestionariosService, private route: Router, private modalService: NgbModal, private _formBuilder: FormBuilder, private http: PreguntasService) {
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
      this.perfilesInternos = data['pinternos'];
      this.perfilesExternos = data['pexternos'];
      this.allcategorias = data['ok'];
      this.allcategoriastb = data['ok'];
      this.spiner = false;
    }, (error) => {
      this.spiner = false;
      swal('Error', error, 'error');
    });
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
     console.log(this.listapregunta);
    }
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
    if(this.model_datos_pregunta['Forma'] === 'DESLIZA'){
      this.maximo_desliza=this.model_datos_pregunta['Respuestas'][1];
      this.minino_desliza=this.model_datos_pregunta['Respuestas'][0];
    }
  	console.log(this.model_datos_pregunta)
    localStorage.setItem('datos_pregunta_respaldo', JSON.stringify(this.model_datos_pregunta));
    this.cmodaledpreg = true;
  }

  guardar_edicion() {
    
    if ((this.model_datos_pregunta['Forma'] ===  'ML') || (this.model_datos_pregunta['Forma'] === 'MLC')) {
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
    }
    if ((this.model_datos_pregunta['Forma'] ===  'START')) {
      this.model_datos_pregunta['Respuestas'] = parseInt(this.model_datos_pregunta['Respuestas']);
    }
    if(this.model_datos_pregunta['Forma'] ===  'DESLIZA'){
        this.model_datos_pregunta['Respuestas']=[this.minino_desliza,this.maximo_desliza];
    }
    this.listapregunta[this.index_edit] = this.model_datos_pregunta;
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
    }
  }
  guarda_posible(e) {
    if (e.key === 'Enter') {
      this.list_tags.push(this.posible_tag);
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
    this.maximo_desliza=0;
    this.minino_desliza=0;
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
    if (this.model_datos_pregunta['Forma'] === 'AB' || this.model_datos_pregunta['Forma'] === 'NUMERO' || this.model_datos_pregunta['Forma'] === 'FECHA' || this.model_datos_pregunta['Forma'] === 'HORA' ||  this.model_datos_pregunta['Forma'] === 'F/H' ) {
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'START') {
      // tslint:disable-next-line:radix
      if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( parseInt(this.model_datos_pregunta['Respuestas']) > 10 )) {
        swal('Error!', 'Ingresa un valor para el numero de estrellas que se mostraran. (debe ser como máximo 10)', 'error');
      } else {
        console.log(this.model_datos_pregunta);
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'SI/NO' || this.model_datos_pregunta['Forma'] === 'SI/NO/NA' || this.model_datos_pregunta['Forma'] === 'SI/NO/NS') {
       if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '')) {
        swal('Error!', 'Ingresa una respuesta valida', 'error');

      } else if (this.model_datos_pregunta['Respuesta'] === undefined || ( this.model_datos_pregunta['Respuesta'] === '') ) {
        swal('Error!', 'Ingresa una respuesta positiva o selecciona "Sin Respuesta"', 'error');
      } else {
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
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
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
      }
      return ;
    }
    if (this.model_datos_pregunta['Forma'] === 'MLC') {
      this.model_datos_pregunta['Respuestas'] = this.list_tags;
      if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '') || ( this.model_datos_pregunta['Respuestas'].length === 0)) {
        swal('Error!', 'Ingresa al menos una respuesta', 'error');
      }  else {
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
      }
      return ;
     }
     if (this.model_datos_pregunta['Forma'] === 'DESLIZA' ) {
      // tslint:disable-next-line:max-line-length
      if ( this.minino_desliza === this.maximo_desliza) {
        swal('Error!', 'Ingresa un valor mìnimo y màximo para el control', 'error');
      } else if ( (this.minino_desliza > this.maximo_desliza) || (this.maximo_desliza < this.minino_desliza)) {
        swal('Error!', 'Ingresa un valor mìnimo y màximo para el control', 'error');
      } else {
        this.model_datos_pregunta['Respuestas'] = [this.minino_desliza, this.maximo_desliza];
        this.minino_desliza=0;
        this.maximo_desliza=0;
        this.listapregunta.push(this.model_datos_pregunta);
        this.model_datos_pregunta = {};
        this.cmodaledpreg = false;
      }
      return ;
      }
      if (this.model_datos_pregunta['Forma'] === 'CARGA' ) {
        if ((this.model_datos_pregunta['Respuestas'] === undefined) || ( this.model_datos_pregunta['Respuestas'] === '' ) ) {
          swal('Error!', 'Ingresa las intrucciones para carga del archivo.', 'error');
        } else {
          this.listapregunta.push(this.model_datos_pregunta);
          this.model_datos_pregunta = {};
          this.cmodaledpreg = false;
        }
        return ;
      }
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
  
}
