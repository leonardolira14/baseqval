import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ConectService } from './services/conect.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralComponent } from './pages/general/general.component';
import{ GeneraliComponent} from './components/general/general.component'
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
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
import { DragAndDropModule } from 'angular-draggable-droppable';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

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
    CaddreporteComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,NgbPaginationModule, NgbAlertModule
    ,NgxSpinnerModule,ReactiveFormsModule,NgxPaginationModule,
    ChartsModule,DragAndDropModule,
    SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary mr-3',
            cancelButtonClass: 'btn btn-danger'
        })
    
    
  ],
  providers: [ConectService,CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
