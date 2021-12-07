import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ConectService } from './services/conect.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { GeneralComponent } from './pages/general/general.component';
import { GeneraliComponent} from './components/general/general.component';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './componets/footer/footer.component';
import { RecpassComponent } from './pages/recpass/recpass.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatosgeComponent } from './components/datosge/datosge.component';
import { LogogeComponent } from './components/logoge/logoge.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { CgruposComponent } from './components/cgrupos/cgrupos.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CusuariosComponent } from './components/cusuarios/cusuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CclientesComponent } from './components/cclientes/cclientes.component';
import { CuestionariosComponent } from './pages/cuestionarios/cuestionarios.component';
import { CcuestionariosComponent } from './components/ccuestionarios/ccuestionarios.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { CpreguntasComponent } from './components/cpreguntas/cpreguntas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CresultadosComponent } from './components/cresultados/cresultados.component';
import { ChartsModule } from 'ng2-charts';
import { CgraficasComponent } from './components/cgraficas/cgraficas.component';
import { CookieService } from 'ngx-cookie-service';
import { AddreporteComponent } from './pages/addreporte/addreporte.component';
import { PrintreporteComponent } from './pages/printreporte/printreporte.component';
import { ListreporteComponent } from './pages/listreporte/listreporte.component';
import { CaddreporteComponent } from './components/caddreporte/caddreporte.component';
import { MaterialModule } from './material.module';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CresumenComponent } from './encuestas/cresumen/cresumen.component';
import { CpanelComponent } from './encuestas/cpanel/cpanel.component';
import { ChacerComponent } from './encuestas/chacer/chacer.component';
import { CvistapreviaComponent } from './encuestas/cvistaprevia/cvistaprevia.component';
import { PanelComponent } from './pages/encuestas/panel/panel.component';
import { ResumenComponent } from './pages/encuestas/resumen/resumen.component';
import { HacerComponent } from './pages/encuestas/hacer/hacer.component';
import { VistapreviaComponent } from './pages/encuestas/vistaprevia/vistaprevia.component';
import { HomeComponent } from './pages/home/home.component';
import {MenuaComponent} from './componets/menua/menua.component';
import { PreciosComponent  } from './components/precios/precios.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PregistroComponent } from './pages/pregistro/pregistro.component';
import { ChangepassComponent } from './pages/changepass/changepass.component';
import { ActivarcuentaComponent } from './pages/activarcuenta/activarcuenta.component';
import { MenubComponent } from './components/menub/menub.component';
import { Cregistro3Component } from './components/cregistro3/cregistro3.component';
import { Registro3Component } from './pages/registro3/registro3.component';
import { PpreciosComponent } from './pages/pprecios/pprecios.component';
import {NgxMaskModule, IConfig} from 'ngx-mask';

import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { PnotificacionesComponent } from './pages/pnotificaciones/pnotificaciones.component';
import { CnotificacionesComponent } from './components/cnotificaciones/cnotificaciones.component';
import { CusuariosplusComponent } from './components/cusuariosplus/cusuariosplus.component';
import { UsuariosplusComponent } from './pages/usuariosplus/usuariosplus.component';
import { CgraficaspComponent } from './components/cresultados/cgraficasp/cgraficasp.component';
import { GraficaspComponent } from './pages/resultados/graficasp/graficasp.component';

 
@NgModule({
  
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    GeneralComponent,
    GeneraliComponent,
    FooterComponent,
    RecpassComponent,
    DatosgeComponent,
    LogogeComponent,
    GruposComponent,
    CgruposComponent,
    UsuariosComponent,
    CusuariosComponent,
    ClientesComponent,
    CclientesComponent,
    CuestionariosComponent,
    CcuestionariosComponent,
    PreguntasComponent,
    CpreguntasComponent,
    ResultadosComponent,
    CresultadosComponent,
    CgraficasComponent,
    AddreporteComponent,
    PrintreporteComponent,
    ListreporteComponent,
    CaddreporteComponent,
    CresumenComponent,
    CpanelComponent,
    ChacerComponent,
    CvistapreviaComponent,
    PanelComponent,
    ResumenComponent,
    HacerComponent,
    VistapreviaComponent,
    HomeComponent,
    MenuaComponent,
    PreciosComponent,
    RegistroComponent,
    PregistroComponent,
    ChangepassComponent,
    ActivarcuentaComponent,
    MenubComponent,
    Cregistro3Component,
    Registro3Component,
    PpreciosComponent,
    PnotificacionesComponent,
    CnotificacionesComponent,
    CusuariosplusComponent,
    UsuariosplusComponent,
    CgraficaspComponent,
    GraficaspComponent,
  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    NgbModule, NgbPaginationModule, NgbAlertModule
    , NgxSpinnerModule, ReactiveFormsModule, NgxPaginationModule,
    ChartsModule,
    MaterialModule,
    SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary mr-3',
            cancelButtonClass: 'btn btn-danger'
        })


  ],
  providers: [ConectService, CookieService, {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'}, ],
  bootstrap: [AppComponent ],
  exports: [],
})

export class AppModule { }
