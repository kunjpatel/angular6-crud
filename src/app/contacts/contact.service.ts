import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IContact } from './contact.model';

@Injectable()
export class ContactService {
  private _contactUrl = './api/contacts/contact.json';

  constructor(private _http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(this._contactUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))), 
      catchError(this.handleError), );
  }

  getContact(id: number): Observable<IContact> {
    return this.getContacts().pipe(
      map((contacts: IContact[]) => contacts.find(p => p.contactId === id)));
  }

  private handleError(err) {
    
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
