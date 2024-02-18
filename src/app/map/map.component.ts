import {Component, inject, OnInit} from '@angular/core';
import {GeolocationService} from "../geolocation.service";
import {Map, marker, tileLayer} from "leaflet";
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housinglocation";
import { WeatherService} from "../weather.service";
import {NgIf} from "@angular/common";
import {Weather} from "../weather";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  weatherService = inject(WeatherService);
  weather: Weather | undefined;
  geo: any = [0, 0];
  map: any;
  location: string = "";

  constructor(private placeService: GeolocationService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  ngOnInit(): void {

    setTimeout( () => {
      if (this.housingLocation) {

        this.geo = this.geo = this.placeService.getHouseLocation(this.housingLocation);
        this.location = this.housingLocation?.city + ", " + this.housingLocation?.state;
        this.setGeoLocation()

        this.getWeather(this.geo + "").catch(reason => console.log(reason))
      }
    }, 1000)
  }
  houseLocation(): void {

    if (this.housingLocation) {
      this.map.remove();
      this.geo = this.geo = this.placeService.getHouseLocation(this.housingLocation);
      this.location = this.housingLocation?.city + ", " + this.housingLocation?.state;

      this.getWeather(this.geo + "").catch(reason => console.log(reason))
      this.setGeoLocation()

    }

  }
  miUbicacion(): void {
    this.map.remove();
    this.geo = this.placeService.userLocalitation;
    this.location = "Mi Ubicación"
    this.getWeather(this.geo + "").catch(reason => console.log(reason))
    this.setGeoLocation()
  }
  async getWeather(location:string) {
    this.weather = await this.weatherService.getWeather(location)
  }
  setGeoLocation(): void {


    this.map = new Map('map').setView(this.geo, 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    marker(this.geo).addTo(this.map).bindPopup("<strong>" + this.location + "<strong>").openPopup();
    marker(this.geo).addTo(this.map).bindPopup("<strong>" + this.location + "<strong>").openPopup();

  }


}
