import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorInicialComponent } from './contador-inicial/contador-inicial.component';
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';

const routes: Routes = [
  {
    path: '', component: IngresarNombreComponent
  },
  {
    path: 'iniciarContador', component: ContadorInicialComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugarRoutingModule { }
