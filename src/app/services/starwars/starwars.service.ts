import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.development';
import { CharacterDetails } from '../../interface/starwars';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  private apiUrl = environment.apiUrl;
  private data!: CharacterDetails;

  constructor(private http: HttpClient) {}

  setData(data: CharacterDetails) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getCharacterByName(name: string): Observable<CharacterDetails> {
    return this.http
      .get<{ results: CharacterDetails[] }>(
        `${this.apiUrl}people/?search=${name}`
      )
      .pipe(map((response) => response.results[0]));
  }

  getMultipleUrls<T>(urls: string[]): Observable<(T | null)[]> {
    const requests = urls.map((url) =>
      this.http.get<T>(url).pipe(
        catchError((error) => {
          console.error(`Erro ao fazer requisição para ${url}`, error);
          return of(null);
        })
      )
    );
    return forkJoin(requests);
  }
}
