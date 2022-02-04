import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/Pregunta';
import { Respuesta } from 'src/app/models/Respuesta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {
  agregarPregunta: FormGroup;
  mostrarError = false;

  constructor(private _quizzService: QuizzService, private fb: FormBuilder) {
    this.agregarPregunta = this.fb.group({
      titulo: ['', Validators.required],
      segundos: [10, Validators.required],
      puntos: [1000, Validators.required],
      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
    })
  }

  ngOnInit(): void {

  }

  agregarPreg() {
    if(this.agregarPregunta.invalid || this.todasIncorrectas()) {
      this.error();
      return;
    }
    
    let listRespuestas: Respuesta[] = [];

    const rtaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const esCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1: Respuesta = {
      descripcion: rtaTitulo1,
      esCorrecta: esCorrecta1,
    }

    listRespuestas.push(respuesta1);

    const rtaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
    const esCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

    const respuesta2: Respuesta = {
      descripcion: rtaTitulo2,
      esCorrecta: esCorrecta2,
    }

    listRespuestas.push(respuesta2);

    const rtaTitulo3= this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
    const esCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;
 
    const respuesta3: Respuesta = {
      descripcion: rtaTitulo3,
      esCorrecta: esCorrecta3,
    }
 
    if(rtaTitulo3 !== ''){
      listRespuestas.push(respuesta3);
    }
      
    const rtaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
    const esCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;
  
    const respuesta4: Respuesta = {
      descripcion: rtaTitulo4,
      esCorrecta: esCorrecta4,
    }
  
    if(rtaTitulo4 !== ''){
      listRespuestas.push(respuesta4);
    }

    const tituloPregunta = this.agregarPregunta.get('titulo')?.value;
    const segundos = this.agregarPregunta.get('segundos')?.value;
    const puntos = this.agregarPregunta.get('puntos')?.value;

    const pregunta: Pregunta = {
      titulo: tituloPregunta,
      segundos: segundos,
      puntos: puntos,
      listRespuestas: listRespuestas
    }

    console.log(pregunta);
    
  }

  get seg() {
    return this.agregarPregunta.get('segundos')?.value;
  }

  get puntos() {
    return this.agregarPregunta.get('puntos')?.value;
  }

  todasIncorrectas() {
    const array = ['respuesta1','respuesta2','respuesta3','respuesta4'];
    
    for (let i = 0; i < array.length; i++) {
        if(this.agregarPregunta.get(array[i])?.get('esCorrecta')?.value == true) {
          return false;
        }
    }

    return true;
  }

  error() {
    this.mostrarError = true;

    setTimeout(() => {
      this.mostrarError = false
    }, 3000);
  }

  sumarRestarSegundos(numero: number) {
    if(this.seg + numero < 5) {
      return;
    }

    this.agregarPregunta.patchValue({ 
      segundos: this.seg + numero 
    });
  }

  esCorrecta(index: string) {
    let stringRta = 'respuesta';
    let nroRespuesta = stringRta.concat(index);
    this.setFalseRespuestas(nroRespuesta);

    const estadoRta = this.obtenerEstadoRespuesta(nroRespuesta);

    this.agregarPregunta.get(nroRespuesta)?.patchValue({
      esCorrecta: !estadoRta
    });
  }

  obtenerEstadoRespuesta(nroRespuesta: string): boolean {
    return this.agregarPregunta.get(nroRespuesta)?.get('esCorrecta')?.value;
  }

  setFalseRespuestas(nroRespuestas: string) {
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    
    for (let i = 0; i < array.length; i++) {
      if(array[i] !== nroRespuestas) {
        this.agregarPregunta.get(array[i])?.patchValue({
          esCorrecta: false
        });
      }      
    }
  }
}
