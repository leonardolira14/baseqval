import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router'
import { LoginComponent } from './pages/login/login.component';
import { GeneralComponent } from './pages/general/general.component';
import { RecpassComponent } from './pages/recpass/recpass.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CuestionariosComponent } from './pages/cuestionarios/cuestionarios.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CgraficasComponent } from  './components/cgraficas/cgraficas.component';
import { AddreporteComponent } from './pages/addreporte/addreporte.component';
const appRoutes:Routes=[
  {path:'',component: LoginComponent},
  {path:'general',component: GeneralComponent},
  {path:'recpass',component: RecpassComponent},
  {path:'grupos',component: GruposComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'clientes',component: ClientesComponent },
  {path:'cuestionarios',component: CuestionariosComponent },
  {path:'preguntas',component: PreguntasComponent },
  {path:'resultados',component: ResultadosComponent },
  {path:'graficas/:id',component: CgraficasComponent },
  {path:'addreport',component: AddreporteComponent },
  
];
@NgModule({
  imports: [ 
    RouterModule.forRoot(appRoutes)

  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
