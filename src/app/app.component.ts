import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(
      data => {
        console.log(data.data[0]);
      },
      error => {
        console.error(error);
      }
    );
  }

}
