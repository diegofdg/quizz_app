import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/Pregunta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {
  listPreguntas: Pregunta[] = [];
  tituloCuestionario: string;
  descripcionCuestionario: string;

  constructor(
    private _quizzService: QuizzService, 
    private router: Router
  ) {
    this._quizzService.getPreguntas().subscribe(data => {
      this.listPreguntas.push(data);
      console.log(this.listPreguntas);
    });
    this.tituloCuestionario = this._quizzService.tituloCuestionario;
    this.descripcionCuestionario = this._quizzService.descripcion;
  }

  ngOnInit(): void {
    if(this.tituloCuestionario === '' || this.descripcionCuestionario === ''){
      this.router.navigate(['/dashboard'])
    }
  }

  eliminarPregunta(index: number) {
    this.listPreguntas.splice(index, 1);
  }

  finalizarCuestionario() {
    const cuestionario: Cuestionario = {
      uid: 'abc',
      titulo: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      codigo: 'codigo',
      cantPreguntas: this.listPreguntas.length,
      fechaCreacion: new Date(),
      listPreguntas: this.listPreguntas
    }
    console.log(cuestionario);    
  }

}
