import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Query {
  constructor(private readonly fs: Firestore){}


async create(collectionName:string, data:any, uuid:string ){
try {
  const collect = collection(this.fs, collectionName)
  //await addDoc(collect,data );
  await setDoc(doc(collect, uuid), data );
} catch (error) {
  console.log((error as any).message); 
}
}
}
