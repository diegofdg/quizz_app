import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/Pregunta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {
  listPreguntas: Pregunta[] = [];

  constructor(private _quizzService: QuizzService) {
    this._quizzService.getPreguntas().subscribe(data => {
      this.listPreguntas.push(data);
      console.log(this.listPreguntas);
    })
  }

  ngOnInit(): void {
  }

}
