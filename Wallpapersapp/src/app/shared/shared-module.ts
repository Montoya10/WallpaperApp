import { Input, input, linkedSignal, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from '../pages/login/login.page';
import { RegisterPage } from '../pages/register/register.page';
import { UpdateuserPage } from '../pages/updateuser/updateuser.page';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { RadioComponent } from './components/radio/radio.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkComponent } from './components/link/link.component';
import { AddbuttonComponent } from './components/addbutton/addbutton.component';



 
@NgModule({
  declarations: [InputComponent, RadioComponent, CardComponent, ButtonComponent, LinkComponent, AddbuttonComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [InputComponent, RadioComponent, CardComponent, ButtonComponent, LinkComponent, AddbuttonComponent]
})
export class SharedModule { }
