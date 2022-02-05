import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {
  nombre = '';

  constructor(private _respuestaQuizzService: RespuestaQuizzService, private router: Router) { }

  ngOnInit(): void {
  }

  ingresarNombre() {
    this._respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar/iniciarContador']);    
  }

}
