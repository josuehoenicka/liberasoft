import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { CityResponseI } from './interface/cities.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cities: CityResponseI[] = [];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(
      response => {
        this.cities = response.data;
      },
      error => {
        console.error(error);
      }
    );
  }

}
