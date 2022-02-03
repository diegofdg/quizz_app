import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({      
    usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],      
      repetirPassword: ['']
    }, { validator: this.checkPassword } as AbstractControlOptions);   
  }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm);
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;
    this.afAuth.createUserWithEmailAndPassword(usuario, password).then(rta => {
      console.log(rta);
    }).catch(error => {
      console.log(error);
    });    
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password']?.value;
    const confirmPassword = group.controls['repetirPassword']?.value;
    return pass === confirmPassword ? null : { notSame: true }
  }
}
