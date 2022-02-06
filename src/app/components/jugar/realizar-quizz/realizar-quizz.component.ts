import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit {
  cuestionario!: Cuestionario;
  nombreParticipante = '';
  segundos = 0;

  constructor(private _respuestaQuizzService: RespuestaQuizzService, private router: Router) { }

  ngOnInit(): void {
    this.cuestionario = this._respuestaQuizzService.cuestionario;
    this.nombreParticipante = this._respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
  }

  validateRefresh() {
    if(this.cuestionario === undefined) {
      this.router.navigate(['/']);
    }
  }

  obtenerSegundos(): number {
    return this.cuestionario.listPreguntas[0].segundos;
  }

  obtenerTitulo(): string {
    return this.cuestionario.listPreguntas[0].titulo;
  }

}
