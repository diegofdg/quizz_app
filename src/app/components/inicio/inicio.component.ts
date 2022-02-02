import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  error: boolean = false;
  pin: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ingresar() {
    if(this.pin === '') {
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);
    }
  }
}