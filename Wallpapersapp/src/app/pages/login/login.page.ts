import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/providers/auth/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public name!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    
    private alertController: AlertController ,
    private readonly authSrv: Auth,
     

  ) {
    this.initForm();
  }

  ngOnInit() {}

public goToRegister() {
  console.log('Go to register page');
}

public doLogin() {
  console.log(this.loginForm.value);} 

 

  private initForm() {
    
    this.name = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.loginForm = new FormGroup({
      name: this.name,
      password: this.password,
      
    });

    

    
  }

  
}
