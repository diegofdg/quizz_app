import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.registerForm = this.fb.group({      
    usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],      
      repetirPassword: ['']
    }, { validator: this.checkPassword } as AbstractControlOptions);   
  }

  ngOnInit(): void {
  }

  register() {
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;    

    this.afAuth.createUserWithEmailAndPassword(usuario, password).then(rta => {
      console.log(rta);
      this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado!');
      this.router.navigate(['/usuario']);
    }).catch(error => {
      console.log(error.code);
      
      this.toastr.error(this.error(error.code), 'Error');
    });    
  }

  error(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El Correo ya esta registrado'

      case 'auth/invalid-email':
        return 'El Correo es inválido'

      case 'auth/weak-password':
        return 'La Contraseña es muy débil'

      default:
        return 'Error desconocido';
    }
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password']?.value;
    const confirmPassword = group.controls['repetirPassword']?.value;
    return pass === confirmPassword ? null : { notSame: true }
  }
}
