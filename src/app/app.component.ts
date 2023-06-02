import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { CitiesResponseI, CityResponseI } from './interface/cities.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cities: CitiesResponseI = {
    rta: '',
    data: []
  };
  selectedCities: CityResponseI[] = [];
  newCity: CityResponseI = {
    CP: '',
    ID: 0,
    CIUDADID: '',
    PROVINCIA: ''
  };
  citySelected: boolean = false;


  constructor(private cityService: CitiesService) {}

  ngOnInit() {
    this.fetchCities();
  }


  fetchCities() {
    this.cityService.getCities().subscribe(
      (response: CitiesResponseI) => {
        this.cities = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editCity(city: CityResponseI){
  }

  saveCity() {
    const newCity = {
      CP: this.newCity.CP,
      ID: this.newCity.ID,
      CIUDADID: this.newCity.CIUDADID,
      PROVINCIA: this.newCity.PROVINCIA
    };
    this.cityService.addCity(newCity).subscribe(
      () => {
        this.cities.data.unshift(newCity);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  cancel() {
    this.newCity = { ...this.newCity, CP: '', ID: 0, CIUDADID: '', PROVINCIA: '' };
  }

  deleteCity(city: CityResponseI) {
    this.cityService.deleteCity(city.ID).subscribe(
      () => {
        this.cities.data = this.cities.data.filter((c) => c.ID !== city.ID);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteSelectedCities() {
    if (this.selectedCities.length > 0) {
      this.selectedCities.forEach(city => {
        this.cityService.deleteCity(city.ID).subscribe(
          () => {
            this.cities.data = this.cities.data.filter(c => c.ID !== city.ID);
          },
          error => {
            console.error(error);
          }
        );
      });
      this.selectedCities = [];
    }
  }

}
