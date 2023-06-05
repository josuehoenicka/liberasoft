import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { CitiesResponseI, CityResponseI } from './interface/cities.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  /* objects */
  cities: CitiesResponseI = {
    rta: '',
    data: []
  };
  selectedCities: CityResponseI[] = [];
  newCity: CityResponseI = {
    CP: '',
    ID: this.numRamdon(1002,999999999),
    CIUDADID: '',
    PROVINCIA: ''
  };

  /* booleans */
  citySelected: boolean = false;
  showNotification: boolean = false;

  constructor(private cityService: CitiesService, private messageService: MessageService) {}

  ngOnInit() {
    this.fetchCities();
  }

  /* get */
  fetchCities() {
    this.cityService.getCities().subscribe(
      (response: CitiesResponseI) => {
        this.cities = response;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}`});
      }
    );
  }

  /* post */
  addCity(newCity: CityResponseI) {
    this.cityService.addCity(newCity).subscribe(
      () => {
        this.cities.data.unshift(newCity);
        this.resetNewCity();
        this.messageService.add({ severity: 'success', summary: 'Added city'});
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}`});
      }
    );
  }

  /* put */
  editCity(city: CityResponseI) {
    city.activeInput = !city.activeInput;
    setTimeout(() => {
      const inputElement = document.getElementById(`input-${city.ID}`);
      if (inputElement) {
        inputElement.classList.add('input-edit');
      }
    });
  }

  /* delete */
  deleteCity(city: CityResponseI) {
    this.cityService.deleteCity(city.ID).subscribe(
      () => {
        this.cities.data = this.cities.data.filter((c) => c.ID !== city.ID);
        this.messageService.add({ severity: 'success', summary: 'City removed'});
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}`});
      }
    );
  }

  /* delete all */
  deleteSelectedCities() {
    if (this.selectedCities.length > 0) {
      this.selectedCities.forEach(city => {
        this.cityService.deleteCity(city.ID).subscribe(
          () => {
            this.cities.data = this.cities.data.filter(c => c.ID !== city.ID);
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
          }
        );
      });
      this.selectedCities = [];
      this.showNotification = true;
    }
  }

  /* reset */
  resetNewCity() {
    this.newCity = {
      CP: '',
      ID: this.numRamdon(1002, 999999999),
      CIUDADID: '',
      PROVINCIA: ''
    };
  }

  /* show a notification (fix multiple notification on deleteSelectedCities) */
  showNotificationMessage() {
    if (this.showNotification) {
      this.messageService.add({ severity: 'success', summary: 'All checked items have been removed' });
      this.showNotification = false;
    }
  }

  /* get random ID */
  numRamdon(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /* handle enter key */
  handleEnterKey(city: CityResponseI) {
    city.activeInput = false;
    this.messageService.add({ severity: 'success', summary: 'Updated value'});
  }

}
