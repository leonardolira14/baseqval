
import { Component, OnInit,ViewChild } from '@angular/core';
import { Color, BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { CresultadosService } from '../../../services/cresultados.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cgraficasp',
  templateUrl: './cgraficasp.component.html',
  styleUrls: ['./cgraficasp.component.scss']
})
export class CgraficaspComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  datos_pregunta = {
    Pregunta:'',
    Forma:'',
    Respuesta:'',
    Peso:''
  };
  public lineChartData: Array<any> = [{data:[],label:''}];
  public lineChartLabels: Array<any> = [];
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
    },
    { 
      backgroundColor: 'rgba(60, 179, 113,0.2)',
      borderColor: 'rgba(60, 179, 113,1)',
      pointBackgroundColor: 'rgba(60, 179, 113,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(60, 179, 113,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public IDCuestionario_ = '';
  public tiempo = '';
  public rangos=[];
  public cuestionario = '';
  public residcuetion = '';
  FechaInicial;
  FechaFinal;
  mostrarR = false;
  constructor(
   private http:CresultadosService,
   private params: ActivatedRoute,
   private Router: Router
  ) { }

  ngOnInit() {
    this.residcuetion = this.params.snapshot.paramMap.get('pregunta');
    this.cuestionario = this.params.snapshot.paramMap.get('cuestionario');
    this.tiempo = this.params.snapshot.paramMap.get('tiempo');
    this.getdata();
  }
  getdata(){
    let datos ;
    if(this.tiempo === 'R'){
       datos = {idPregunta: this.residcuetion,cuestionario:this.cuestionario,tiempo:this.tiempo,Rangos:this.rangos};
    }else{
       datos = {idPregunta: this.residcuetion,cuestionario:this.cuestionario,tiempo:this.tiempo};
    }
  
    this.http.getdetallepregunta( datos)
    .subscribe(data=>{
      console.log(data);
      this.datos_pregunta = data['pregunta'];
      if(this.datos_pregunta['Forma']==='NUMERO' || this.datos_pregunta['Forma']==='START' || this.datos_pregunta['Forma']==='DESLIZA'){
        this.lineChartType = 'bar';
      }
      data['datagrafica'].forEach((element,index)=>{
        this.lineChartData[index]=element;
      })
      this.lineChartLabels = data['datalabel'];

  
     
     
      //console.log(data);
    },(error:HttpErrorResponse)=>{
      console.log(error);
    })

  }
  ir(tiempo){
    this.tiempo = tiempo;
    
    this.getdata();
  }
 
  datafecha(){
    const fecha1 = new Date(this.FechaInicial);
    const fecha2 = new Date(this.FechaFinal);
    const rango = [fecha1.getDate()+'-'+(fecha1.getMonth() + 1 )+'-'+fecha1.getFullYear(),fecha2.getDate()+'-'+(fecha2.getMonth() + 1 )+'-'+fecha2.getFullYear()]
   this.tiempo='R';
   this.rangos =rango;
   this.getdata();
  }
 
}
