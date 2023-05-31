import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitiesResponseI, CityResponseI } from '../interface/cities.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://api.dev.liberasoft.com.ar/api/examen';

  constructor(private http: HttpClient) { }

  getCities(): Observable<CitiesResponseI> {
    return this.http.get<CitiesResponseI>(this.apiUrl);
  }

  postCity(city: CityResponseI): Observable<any> {
    return this.http.post(this.apiUrl, city);
  }

}
