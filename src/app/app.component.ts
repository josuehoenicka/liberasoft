import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { CitiesResponseI, CityResponseI } from './interface/cities.interface';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  cities: CitiesResponseI = {
    rta: '',
    data: []
  };
  selectedCities: CityResponseI[] = [];
  newCity: CityResponseI = {
    CP: '',
    ID: this.numRamdon(1,999999999),
    CIUDADID: '',
    PROVINCIA: ''
  };
  citySelected: boolean = false;

  constructor(private cityService: CitiesService, private messageService: MessageService) {}

  ngOnInit() {
    this.fetchCities();
  }

  fetchCities() {
    this.cityService.getCities().subscribe(
      (response: CitiesResponseI) => {
        this.cities = response;
      },
      (error) => {
        this.messageService.add({ severity: 'success', summary: 'Error', detail: `${error}`});
      }
    );
  }

  addCity(newCity: CityResponseI) {
    this.cityService.addCity(newCity).subscribe(
      () => {
        this.cities.data.unshift(newCity);
        this.resetNewCity();
        this.messageService.add({ severity: 'success', summary: 'City added'});
      },
      (error) => {
        this.messageService.add({ severity: 'success', summary: 'Error', detail: `${error}`});
      }
    );
  }

  resetNewCity() {
    this.newCity = {
      CP: '',
      ID: this.numRamdon(1, 999999999),
      CIUDADID: '',
      PROVINCIA: ''
    };
  }

  editCity(city: CityResponseI) {
    city.activeInput = !city.activeInput;
    setTimeout(() => {
      const inputElement = document.getElementById(`input-${city.ID}`);
      if (inputElement) {
        inputElement.classList.add('input-edit');
      }
    });
  }

  handleEnterKey(city: CityResponseI) {
    city.activeInput = false;
    this.messageService.add({ severity: 'success', summary: 'Value changed'});
  }

  deleteCity(city: CityResponseI) {
    this.cityService.deleteCity(city.ID).subscribe(
      () => {
        this.cities.data = this.cities.data.filter((c) => c.ID !== city.ID);
        this.messageService.add({ severity: 'success', summary: 'City deleted'});
      },
      (error) => {
        this.messageService.add({ severity: 'success', summary: 'Error', detail: `${error}`});
      }
    );
  }

  deleteSelectedCities() {
    if (this.selectedCities.length > 0) {
      this.selectedCities.forEach(city => {
        this.cityService.deleteCity(city.ID).subscribe(
          () => {
            this.cities.data = this.cities.data.filter(c => c.ID !== city.ID);
            this.messageService.add({ severity: 'success', summary: 'Cities deleted'});
          },
          error => {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: `${error}`});
          }
        );
      });
      this.selectedCities = [];
    }
  }

  numRamdon(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
