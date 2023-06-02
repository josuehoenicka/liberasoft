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

  addCity(city: CityResponseI): Observable<CityResponseI> {
    return this.http.post<CityResponseI>(this.apiUrl, city);
  }

  editCity(city: CityResponseI): Observable<CityResponseI> {
    const url = `${this.apiUrl}/${city.ID}`;
    return this.http.put<CityResponseI>(url, city);
  }

  deleteCity(cityId: number): Observable<any> {
    const url = `${this.apiUrl}/${cityId}`;
    return this.http.delete(url);
  }

}
