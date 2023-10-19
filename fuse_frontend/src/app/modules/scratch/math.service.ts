import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor(private _httpClient: HttpClient) { }

    /**
     * Check if a number is even
     */
    checkEven(num: number): Observable<boolean>
    {
        return this._httpClient.get<boolean>('api/v1/math/check/'+num).pipe(
            tap((response: any) => {
                console.log('Response from server ('+num+' is even?) => ', response);
            }),
            map((response: any) => {
              return response.data;
            })
        );
    }
}
