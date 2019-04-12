import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDate, NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CresultadosService } from '../../services/cresultados.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GraficaData } from '../../class/grafica';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Router,ActivatedRoute } from '@angular/router';
const grafica = new GraficaData();

@Component({
  selector: 'app-cresultados',
  templateUrl: './cresultados.component.html',
  styleUrls: ['./cresultados.component.scss']
})
export class CresultadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  pageActual = 1;
  public tempid = '';
  public detallesresumen: any [] = [{Nombre: '', Emisor: '', Receptor: '', leyenda: '', Status: ''}];
  public table: any[] = [];
  public detailstable: any [] = [];
  public listcuest: any [] = [];
  public residcuetion = '';
  public statusc: any;
  public datosempresa: any [] = JSON.parse(localStorage.empresa);
  public IDCuestionario: any = '';
  public msgerror = '';
  public spiner = false;
  public lineChartData: Array<any> = [
    {data: [0], label: ''},
  ];
  public lineChartLabels: Array<any> = [0];
  public lineChartOptions: any = {
    responsive: true
  };
  cmodaledpreg = false;
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
  public IDCuestionario_ = '';
  hoveredDate: NgbDate;
  rangedate = '';
  fromDate: NgbDate;
  toDate: NgbDate;
  // tslint:disable-next-line:max-line-length
  constructor(
    private params: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: CresultadosService,
    private calendar: NgbCalendar,
    private modalService: NgbModal
    ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit() {
    this.residcuetion = this.params.snapshot.paramMap.get('id');
    this.getresumen();
  }
  opencalendar(modal, sise?) {
    (sise === null) ? sise = 'sm' : sise = sise;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: sise});
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  pasedate(modal) {
    // tslint:disable-next-line:max-line-length
    this.rangedate =  this.fromDate.year + '/' + this.fromDate.month + '/' + this.fromDate.day + '-' + this.toDate.year + '/' + this.toDate.month + '/' + this.toDate.day;
    console.log(this.rangedate );
    this.modalService.dismissAll(modal);
    this.getresumen();
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // empezamos con la funciona lidad
  getquestyonary() {
    this.spiner = true;
    this.http.getquestionary(this.datosempresa['IDEmpresa'], this.statusc)
    .subscribe((resp) => {
      if ( resp['ok'] !== false) {
        this.listcuest = resp['ok'];
      }
     this.spiner = false;
    });
    // datosempresa;
  }
  getresumen() {
    this.spiner = true;
    const dates = new Date();
    console.log(dates.getDate(), dates);
    let fechainicio: any = '';
    let fechafin: any = '';
    let  mes1 = 0;
    let mes2 = 0;
    // verifico si hay algun rango de fechas si no mando los ultimos 30 dias
    if (this.rangedate === '') {
      if (dates.getMonth() + 1 === 1) {
        fechainicio = dates.getFullYear() - 1 + '/12/' + dates.getDate();
        fechafin = dates.getFullYear() + '/01/' + dates.getDate();
      } else {
        mes1 = dates.getMonth();
        mes2 = dates.getMonth() + 1;
        fechainicio = dates.getFullYear() + '/' + mes1 + '/' + dates.getDate();
        fechafin = dates.getFullYear() + '/' + mes2 + '/' + dates.getDate();
      }
      this.rangedate = fechainicio + '-' + fechafin;
    }
    console.log(this.rangedate);
    // console.log(this.residcuetion);
      this.http.getresumen(this.residcuetion, this.rangedate, this.datosempresa['IDEmpresa'])
      .subscribe((resp) => {
        this.IDCuestionario = this.residcuetion;
        const _lineChartData: Array<any> = new Array(this.lineChartData.length);
        let  _labels: Array<any> = new Array();
        _lineChartData[0] = { data: resp['grafica']['datos']['data'], label: resp['grafica']['datos']['label']};
        this.lineChartData = _lineChartData;
        _labels = resp['grafica']['labels'];
        this.chart.chart.config.data.labels = _labels;
        this.chart.chart.update();
        this.table = resp['table'];
        this.detallesresumen[0]['Nombre'] = resp['detalles']['Nombre'];
        this.detallesresumen[0]['Status'] = resp['detalles']['Status'];
        this.detallesresumen[0]['Emisor'] = resp['detalles']['Emisor'];
        this.detallesresumen[0]['Receptor'] = resp['detalles']['Receptor'];
        this.detallesresumen[0]['leyenda'] = resp['detalles']['dialogo'];
       this.spiner = false;
      });
    }

  // funcon para los detalles de las graficas
  getdetallstables(modal) {
    console.log(this.IDCuestionario, this.tempid);
    if (this.IDCuestionario === '') {
      this.msgerror = 'No existe un cuestionario seleccionado';
      this.opencalendar(modal);
    } else if (this.IDCuestionario === this.tempid) {
          this.cmodaledpreg = true;
    } else {
        this.tempid = this.IDCuestionario;
        this.spiner = true;
      this.http.getdetailstable(this.IDCuestionario, this.rangedate, this.datosempresa['IDEmpresa'])
      .subscribe((resp) => {
        this.detailstable = resp['tabledetaills'];
        this.spiner = false;
         this.cmodaledpreg = true;

      });

    }

  }
  getdetallsgraphics(modal) {
    if (this.IDCuestionario === '') {
      this.msgerror = 'No existe un cuestionario seleccionado';
      this.opencalendar(modal);
    } else {
       this.router.navigateByUrl('/graficas/' + this.IDCuestionario);
    }
  }
}
