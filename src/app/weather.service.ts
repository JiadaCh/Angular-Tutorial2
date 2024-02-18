import {Injectable} from "@angular/core";
import {HousingLocation} from "./housinglocation";
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseURL="http://api.weatherapi.com/v1/current.json?key="
  key="67f3f36592e44795b35160234241802"
  constructor() {
  }

  async getWeather(location:string){
    const data = await fetch(`${this.baseURL+this.key}&q=${location}`);
    return await data.json() ?? {};
  }
}

