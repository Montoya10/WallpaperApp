import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { ErrorHandler } from './services/error-handler/error-handler';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_APP)),
    provideAuth(() => getAuth()),
    ErrorHandler,
  ],
})
export class CoreModule {}