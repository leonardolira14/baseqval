import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource, MatSortable} from '@angular/material';
import { CuestionariosService } from '../../services/cuestionarios.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


export interface CuestionarioData {
  IDCuestionario: string;
  IDDetalles: string;
  progress: string;
  Nombre: string;
  Receptor: string;
  Emisor: string;
}


@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.scss']
})

export class CpanelComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'fechaultima', 'norespuestas' , 'resultados', 'compartir', 'acciones'];
  dataSource: MatTableDataSource<CuestionarioData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('creargrupo') private creargrupo;
  @ViewChild('mnotificacion') private mnotificacion;
  @ViewChild('ngrupos') private ngrupos;
  @ViewChild('modalnueva') private modalnueva;
  @ViewChild('errorrfcSwal') private errorrfcSwal: SwalComponent;
  @ViewChild('errorrrespSwal') private errorrrespSwal: SwalComponent;

  @Input() sorting: MatSortable;
  public datosempresa;
  public funcionesusuario: any[] = [];
  public datosusuario: any[] = [];
  public newgrupe = false;
  public modelnewgrupo = {};
  public grupos = [];
  public tdencuestas = [];
  public usuarios = [];
  public listanotifiaciones = [];
  public datoscueslista = [];
  public modelgrupoper = {};
  public deleteclientid = '';
  public spiner = true;
  selected = 'td';
  public lista_encuestas: any;
  constructor(private route: Router, private modalService: NgbModal, private http: CuestionariosService) {
    this.datosempresa = JSON.parse(localStorage.empresa);

   }
   nuew() {
     this.route.navigateByUrl('/encuestas/select/N');
     // this.open_modal(this.modalnueva);
   }
   goto(ir) {
    this.closemodel(this.modalnueva);
     this.route.navigateByUrl(ir);
   }
   open_modal(modal) {
     this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'} );
   }
   closemodel(content) {
    this.modalService.dismissAll(content);
    }

   ngOnInit() {
      this.http.getall(this.datosempresa['IDEmpresa'])
      .subscribe((data) => {
        console.log(data);
        this.grupos = data['grupos'];
        this.tdencuestas = data['ok'];
        data['usuarios'].forEach(element => {
          this.usuarios.push({id: element.Id, nombre: element.nombre, apellido: element.apellido, checked: false});
        });
        this.lista_encuestas = this.tdencuestas;
        console.log(this.tdencuestas);
        this.dataSource = new MatTableDataSource(this.tdencuestas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort ;
        this.spiner = false;
      });
  }

  applyFilter(filterValue: string) {
    if (filterValue === '') {
      this.tdencuestas = this.lista_encuestas;
    } else {
      this.tdencuestas = this.lista_encuestas.filter(resp => {
        return resp.Nombre.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());

      });
    }

  }
  admin_grupos() {
    this.open_modal(this.creargrupo);
  }
  new_grupo() {
    this.newgrupe = true;
  }
  addgrup() {
    this.spiner = true;
    if (this.modelnewgrupo['IDGrupo']) {
      this.http.updategroup(this.modelnewgrupo)
      .subscribe((data) => {
        this.grupos = data['ok'];
        console.log(data);
        this.newgrupe = false;
        this.modelnewgrupo = {};
        this.spiner = false;
        swal('Exito..', 'Datos Actualizados', 'success');
      });
    } else {
      this.modelnewgrupo['IDEmpresa'] = this.datosempresa['IDEmpresa'];
      this.http.addgroup(this.modelnewgrupo)
      .subscribe((data) => {
        this.grupos = data['ok'];
        console.log(data);
        this.newgrupe = false;
        this.modelnewgrupo = {};
        this.spiner = false;
        swal('Exito..', 'Datos Actualizados', 'success');
      } );
    }
  }
  deletgrup(id) {
    this.spiner = true;
    const datos = {IDEmpresa: this.datosempresa['IDEmpresa'], IDGrupo: id};
    this.http.deletegroup(datos)
    .subscribe((data) => {
      this.grupos = data['ok'];
      this.spiner = false;
      swal('Exito..', 'Datos Actualizados', 'success');
    });
  }
  editgrup(id) {
    this.grupos.forEach((grupo) => {
      if (grupo.IDGrupo === id) {
        this.modelnewgrupo = grupo;
        this.newgrupe = true;
      }
    });
  }
  // funcion para los cuestionarios que tiene un grupo
  ordergroup() {
    let  list = [];
    if (this.selected === 'td') {
      list = this.tdencuestas;

    } else if ( this.selected === 'sn' ) {
      this.tdencuestas.forEach((item) => {
        if (item.Grupo === '0') {
          list.push(item);
        }
      });
    } else {
      this.tdencuestas.forEach((item) => {
        if (item.Grupo === this.selected) {
          list.push(item);
        }
      });
    }
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // funcion para desactivar un cuestionario
  desactivar(IDCuestionario, Status) {
    this.spiner = true;
    this.http.delete(IDCuestionario, Status)
    .subscribe(() => {
      this.ngOnInit();
      this.spiner = false;
      swal('Exito..', 'Datos Actualizados', 'success');
    });

  }
  // funcion para activar las notificaciones
  muestranotificaciones(IDCuestionario) {
    this.listanotifiaciones = [];
    this.usuarios.forEach(item => {
      item.checked = false;
    });
    this.tdencuestas.forEach(item => {
        if (item.IDCuestionario === IDCuestionario ) {
          this.datoscueslista = item;
          return ;
        }
    });
    if (this.datoscueslista['Notificaciones'] !== '') {
      this.listanotifiaciones = JSON.parse( this.datoscueslista['Notificaciones']);
    }

    this.listanotifiaciones.forEach(noti => {
      this.usuarios.forEach(item => {
        if (item.id === noti) {
          item.checked = true;
        }
      });
    });
    this.open_modal(this.mnotificacion);
  }
  addusernot(e) {
    if ( e.checked === true) {
      this.listanotifiaciones.push(e.source.value);
    } else {
      this.listanotifiaciones.forEach((item, index) => {
        if (item === e.source.value) {
          this.listanotifiaciones.splice(index, 1);
        }
      });
    }

  }
  guardar_notificacion() {
    this.spiner = true;
    this. closemodel(this.mnotificacion);
    const datos = {IDCuestionario: this.datoscueslista['IDCuestionario'], Notificacion: this.listanotifiaciones};
    this.http.updatenotificaciones(datos)
    .subscribe((data) => {
      this.ngOnInit();
      this.datoscueslista = [];
      this.listanotifiaciones = [];
      this.spiner = false;
      swal('Exito..', 'Datos Actualizados', 'success');
    });
  }
  open_modalgrupos(idencuesta) {

    this.tdencuestas.forEach(( item) => {
        if (item.IDCuestionario === idencuesta) {
          this.modelgrupoper['IDGrupo'] = item.Grupo;
          this.modelgrupoper['IDCuestionario'] = idencuesta;
          this.modelgrupoper['IDEmpresa'] = this.datosempresa['IDEmpresa'];
          return ;
        }
    });
    this.open_modal(this.ngrupos);
  }
  addgrupoaencuesta() {
    this.spiner = true;
    this.http.addgrupoencuesta(this.modelgrupoper)
    .subscribe((data) => {
      this.ngOnInit();
      this.closemodel(this.ngrupos);
      this.spiner = false;
      swal('Exito..', 'Datos Actualizados', 'success');
    });
  }
  alertdeleteresp(idvalora) {
    this.errorrrespSwal.text = 'Se eliminaran todos los resultados relacionados con este cuestionario, realizados y recibidos.';
    this.deleteclientid = idvalora;
    this.errorrrespSwal.show();
  }
  delete_respuestas() {
    this.spiner = true;
    const datos = {IDCuestionario: this.deleteclientid, IDEmpresa: this.datosempresa['IDEmpresa']};
    this.http.delete_respuestas(datos)
    .subscribe((data) => {
      this.ngOnInit();
      this.spiner = false;
      swal('Exito..', 'Datos Actualizados', 'success');
    });
  }
  most_url(idencuesta) {
    swal('Exito..', 'Copia y Pega la siguiente URL: ' + environment.urlserverp + 'encuesta/' + idencuesta, 'success');
  }
  alertdele(id) {
    this.spiner = true;
    const datos = {IDCuestionario: id};
    this.http.numregistros(datos)
    .subscribe((data) => {
      console.log(data['ok']);
      // tslint:disable-next-line:max-line-length
      this.errorrfcSwal.text = 'Se eliminaran todos los resultados relacionados con este cuestionario, realizados y recibidos, total de Registros: ' + data['ok'] + '.';
      this.deleteclientid = id;
      this.spiner = false;
       this.errorrfcSwal.show();
    });
  }
  borrarcuestionario() {
    this.spiner = true;
    const datos = {IDCuestionario: this.deleteclientid};
    this.http.borrar(datos)
    .subscribe((data) => {
      this.ngOnInit();
      swal('Exito..', 'Datos Actualizados', 'success');

    });
  }
  editar_encuesta(id) {
    this.route.navigateByUrl('/encuestas/select/' + id);
  }

}

