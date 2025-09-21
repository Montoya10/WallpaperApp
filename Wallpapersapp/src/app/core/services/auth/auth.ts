import { Injectable } from '@angular/core';
import {
  Auth as AuthFirebase,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
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
      throw error;
    }
  }

  //login

  async login(email: string, password: string) {
    try {
      const resp = await signInWithEmailAndPassword(this.afb, email, password);
      console.log(resp);
      
    } catch (error) {
      console.log((error as any).message);
      throw error;
    }
  }

  //logout
  async logOut() {
    await signOut(this.afb);
  }

  //login with google

  async loginWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();
      const response = await signInWithPopup(this.afb, googleProvider);
    } catch (error) {
      console.log((error as any).message);
      throw error;
    }
  }
}
