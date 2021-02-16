import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { HomeAssistenteComponent } from './components/home-assistente/home-assistente.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeAssistenteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
