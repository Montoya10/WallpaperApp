import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/services/auth/auth';

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

  constructor(
    private alertController: AlertController,
    private readonly router: Router,
    private readonly authSrv: Auth
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public goToRegister() {
    console.log('Go to register page');
    this.router.navigate(['/register']);
  }

  public async doLogin() {
    await this.authSrv.login(this.email.value, this.password.value);
    this.router.navigate(['/home']);
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
