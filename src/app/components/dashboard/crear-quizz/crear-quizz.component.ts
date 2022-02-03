import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent implements OnInit {
  cuestionarioForm: FormGroup;
  mostrarError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cuestionarioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  siguiente() {
    if(this.cuestionarioForm.invalid) {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
    }
  }
}
