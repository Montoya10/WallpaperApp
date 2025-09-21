import { Toast } from 'src/app/core/services/toast/toast';
// error-handler.ts
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {
  
  private firebaseErrorMessages: { [key: string]: string } = {
    // Errores de registro
    'auth/email-already-in-use': 'El correo electrónico ya está registrado',
    'auth/invalid-email': 'El formato del correo electrónico no es válido',
    'auth/operation-not-allowed': 'La operación no está permitida',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    
    // Errores de login
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No existe una cuenta con este correo electrónico',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas',
    
    // Errores generales
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
    'auth/popup-closed-by-user': 'El popup de Google fue cerrado',
    'auth/popup-blocked': 'El popup de Google fue bloqueado',
    'auth/cancelled-popup-request': 'Solicitud de popup cancelada',
    
    // Errores de Google Sign-In
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con el mismo email pero diferente método de autenticación',
  };

  constructor(private toast: Toast) {}

  handleFirebaseError(error: any, context: 'register' | 'login' | 'google' = 'login') {
    const errorCode = error.code || 'unknown';
    const errorMessage = this.getFirebaseErrorMessage(errorCode, context);
    
    this.toast.showError(errorMessage);
    console.error('Firebase Error:', errorCode, error.message);
  }

  private getFirebaseErrorMessage(errorCode: string, context: string): string {
    if (this.firebaseErrorMessages[errorCode]) {
      return this.firebaseErrorMessages[errorCode];
    }

    // Mensajes por defecto según el contexto
    const defaultMessages = {
      register: 'Error al registrar la cuenta',
      login: 'Error al iniciar sesión',
      google: 'Error al iniciar sesión con Google'
    };

    return defaultMessages[context as keyof typeof defaultMessages] || 'Error desconocido';
  }

  showSuccess(message: string) {
    this.toast.showSuccess(message);
  }

  showWarning(message: string) {
    this.toast.showWarning(message);
  }

  showInfo(message: string) {
    this.toast.showInfo(message);
  }
}