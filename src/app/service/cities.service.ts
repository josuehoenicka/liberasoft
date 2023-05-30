import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://api.dev.liberasoft.com.ar/api/examen';

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
