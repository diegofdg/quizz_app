import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {
  cuestionario!: Cuestionario;
  nombreParticipante = '';
  segundos = 0;
  indexPregunta = 0;
  setInterval: any;

  opcionSeleccionada: any;
  indexSeleccionado: any;

  constructor(private _respuestaQuizzService: RespuestaQuizzService, private router: Router) { }

  ngOnInit(): void {
    this.cuestionario = this._respuestaQuizzService.cuestionario;
    this.nombreParticipante = this._respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
    this.iniciarContador();
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  validateRefresh() {
    if(this.cuestionario === undefined) {
      this.router.navigate(['/']);
    }
  }

  obtenerSegundos(): number {
    return this.segundos;
  }

  obtenerTitulo(): string {
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;
  }

  iniciarContador() {
    this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;

    this.setInterval = setInterval(() => {
      if(this.segundos === 0) {
        this.indexPregunta++;
        clearInterval(this.setInterval);
        this.iniciarContador();
      }

      this.segundos = this.segundos - 1;

    }, 1000);
  }

  respuestaSeleccionada(respuesta: any, index: number) {
    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
  }

  addClassOption(respuesta: any): string {
    if(respuesta === this.opcionSeleccionada) {
      return 'classSeleccionada';
    } else {
      return '';
    }
  }

  siguiente() {
    clearInterval(this.setInterval)
    this.agregarRespuesta();
    this.iniciarContador()
  }

  agregarRespuesta() {
    if(this.cuestionario.listPreguntas.length - 1 === this.indexPregunta){
      this.router.navigate(['/jugar/respuestaUsuario']);

    } else {
      this.indexPregunta++;
      this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    }    
  }

}
