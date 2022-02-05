import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';

const routes: Routes = [
  { 
    path: '', component: ListCuestionariosComponent 
  },
  {
    path: 'crearQuizz', component: CrearQuizzComponent 
  },
  {
    path: 'crearPreguntas', component: CrearPreguntasComponent
  },
  {
    path: 'verCuestionario/:id', component: VerCuestionarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
