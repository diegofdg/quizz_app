import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'recuperarPassword', component: RecuperarPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
