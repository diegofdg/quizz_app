import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  error: boolean = false;
  pin: string = '';
  errorText = '';
  loading = false;

  constructor(private respuestaQuizz: RespuestaQuizzService) { }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.pin);
    if(this.pin == '') {
      this.errorMensaje('Por favor ingrese PIN');
      return;
     }
    
    this.loading = true;

    this.respuestaQuizz.searchByCode(this.pin).subscribe({
      next: (responseOK) => {
        console.log(responseOK.empty);
        this.loading = false;
        if(responseOK.empty == true) {
          this.errorMensaje('PIN invalido');
        }
      },
      error: (responseFail) => {
        console.log(responseFail);
        this.loading = false;
      }
    });
  }

  errorMensaje(text: string) {
    this.errorText = text;
    this.error = true;
    this.pin = '';

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }
}