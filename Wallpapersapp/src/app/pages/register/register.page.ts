import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/providers/auth/auth';

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
  public languajes!: FormControl;
  public registerForm!: FormGroup;

  constructor(
    private readonly authSrv: Auth,
    private alertController: AlertController,
    private router: Router,
    
  ) {
    this.initForm();
  }

  public async doRegister() {
    
    await this.authSrv.register(this.email.value, this.password.value) 
   
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
    //this.languajes = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      //languajes: this.languajes,
    });
  }

  public goToLogin() {
    console.log('go to login');
    this.router.navigate(['/login'])
  }



  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}