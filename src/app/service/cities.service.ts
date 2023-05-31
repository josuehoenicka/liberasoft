import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitiesRespondeI } from '../interface/cities.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://api.dev.liberasoft.com.ar/api/examen';

  constructor(private http: HttpClient) { }

  getCities(): Observable<CitiesRespondeI> {
    return this.http.get<CitiesRespondeI>(this.apiUrl);
  }

}
