import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private _errorService: ErrorService
    ) { 
    this.loginForm = this.fb.group({
      usuario: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;    
    this.afAuth.signInWithEmailAndPassword(usuario, password)
      .then((respuesta) => {
        console.log(respuesta);
        this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado!');
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this._errorService.error(error.code), 'Error');
        this.loginForm.reset();
      });
  }
}
