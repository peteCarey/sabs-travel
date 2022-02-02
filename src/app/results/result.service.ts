import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IResult } from './result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private resultUrl = '../assets/results.json';

  constructor(private http: HttpClient) {}

  getResults(): Observable<IResult[]> {
    return this.http.get<IResult[]>(this.resultUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),

      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error hass occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
