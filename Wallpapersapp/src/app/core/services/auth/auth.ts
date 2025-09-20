import { Injectable } from '@angular/core';
import {
  Auth as AuthFirebase,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private readonly afb: AuthFirebase) {}

  //register
  async register(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.afb,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log((error as any).message);
    }
  }

  //login

  async login(email: string, password: string) {
    try {
      const resp = await signInWithEmailAndPassword(this.afb, email, password)
      console.log(resp)
    } catch (error) {
            console.log((error as any).message);
    }
  }

  //async
async logOut(){

  await signOut(this.afb)
}

  //login with google
}
