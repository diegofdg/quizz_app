import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El Correo ya esta registrado';

      case 'auth/invalid-email':
        return 'El Correo es inválido';

      case 'auth/weak-password':
        return 'La Contraseña es muy débil';

      case 'auth/user-not-found':
        return 'Usuario inválido';
      
      case 'auth/wrong-password':
        return 'La Contraseña es inválida'

      default:
        return 'Error desconocido';
    }
  }
}
