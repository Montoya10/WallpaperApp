import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/services/auth/auth';
import { ErrorHandler } from 'src/app/core/services/error-handler/error-handler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly authSrv: Auth,
    private router: Router,
    private errorHandler: ErrorHandler
  ) {
    this.initForm();
  }

  public async doRegister() {
    if (this.registerForm.invalid) {
      this.errorHandler.showWarning('Por favor, completa todos los campos correctamente');
      return;
    }

    this.isLoading = true;
    
    try {
      await this.authSrv.register(this.email.value, this.password.value);
      this.errorHandler.showSuccess('¡Cuenta creada! Ahora puedes iniciar sesión');
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'register');
    } finally {
      this.isLoading = false;
    }
  }

  ngOnInit() {}

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }

  public goToLogin() {
    this.router.navigate(['/login']);
  }
}