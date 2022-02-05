import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  error: boolean = false;
  pin: string = '';
  errorText = '';
  loading = false;
  suscriptionCode: Subscription = new Subscription();

  constructor(private respuestaQuizz: RespuestaQuizzService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscriptionCode.unsubscribe();
  }

  ingresar() {
    if(this.pin == '') {
      this.errorMensaje('Por favor ingrese PIN');
      return;
    }
    
    this.loading = true;

    this.suscriptionCode = this.respuestaQuizz.searchByCode(this.pin).subscribe({
      next: (responseOK) => {
        this.loading = false;
        if(responseOK.empty == true) {
          this.errorMensaje('PIN invalido');
        } else {
          responseOK.forEach((element:any) => {
            const cuestionario: Cuestionario = {
              id: element.id,
              ...element.data()
            }
            this.respuestaQuizz.cuestionario = cuestionario;
          });
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