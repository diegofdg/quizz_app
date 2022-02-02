import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recuperarPassword() {
    
  }

}
