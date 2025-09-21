import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Query } from 'src/app/core/providers/query/query';
import { Auth } from 'src/app/core/services/auth/auth';
import { ErrorHandler } from 'src/app/core/services/error-handler/error-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authSrv: Auth,
    private errorHandler: ErrorHandler,
    private readonly querySrv: Query,
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public goToRegister() {
    this.router.navigate(['/register']);
  }

  public async doLogin() {
    if (this.loginForm.invalid) {
      this.errorHandler.showWarning('Por favor, completa todos los campos correctamente');
      return;
    }
    this.isLoading = true;
    try {
      await this.authSrv.login(this.email.value, this.password.value);
      this.errorHandler.showSuccess('¡Bienvenido! Sesión iniciada correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'login');
    } finally {
      this.isLoading = false;
    }
  }

  public async doLoginWithGoogle() {
    this.isLoading = true;
    
    try {
      await this.authSrv.loginWithGoogle();
      this.errorHandler.showSuccess('¡Bienvenido! Sesión con Google iniciada correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorHandler.handleFirebaseError(error, 'google');
    } finally {
      this.isLoading = false;
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}