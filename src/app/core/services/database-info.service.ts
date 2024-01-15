import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DatabaseInfoService {
  private database: Database = Database.Firestore;
  private databaseSubject = new BehaviorSubject<Database>(this.database);
  public database$ = this.databaseSubject.asObservable();

  changeDatabase() {
    if (this.database === Database.Firestore) {
      this.database = Database.Mongo;
    } else {
      this.database = Database.Firestore;
    }
    this.databaseSubject.next(this.database);
  }
}

export enum Database {
  Firestore = 'Firestore',
  Mongo = 'Mongo'
}
