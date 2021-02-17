import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { HomeAssistenteComponent } from './components/home-assistente/home-assistente.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeAssistenteComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
