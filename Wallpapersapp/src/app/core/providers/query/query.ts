// query.ts - Agrega estos métodos
import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Query {
  constructor(private readonly fs: Firestore){}

  async create(collectionName:string, data:any, uuid:string ){
    try {
      const collect = collection(this.fs, collectionName)
      await setDoc(doc(collect, uuid), data );
    } catch (error) {
      console.log((error as any).message); 
    }
  }

  
  async update(collectionName: string, uuid: string, data: any) {
    try {
      const docRef = doc(this.fs, collectionName, uuid);
      await updateDoc(docRef, data);
    } catch (error) {
      console.log((error as any).message);
      throw error;
    }
  }


  async get(collectionName: string, uuid: string) {
    try {
      const docRef = doc(this.fs, collectionName, uuid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('Documento no encontrado');
      }
    } catch (error) {
      console.log((error as any).message);
      throw error;
    }
  }
}