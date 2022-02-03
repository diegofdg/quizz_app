import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';

const routes: Routes = [
  { 
    path: '', component: ListCuestionariosComponent 
  },
  {
    path: 'crearQuizz', component: CrearQuizzComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
