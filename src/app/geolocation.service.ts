import {Injectable} from "@angular/core";
import {HousingLocation} from "./housinglocation";
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
 userLocalitation: [number, number] | undefined;
  constructor() {
    this.getUserLocation();
  }
  public getHouseLocation(house: HousingLocation){
    if (house){
      return [house.latitude,house.longitude]
    }else{
      return [0,0]
    }

  }
  public getUserLocation(){
    navigator.geolocation.getCurrentPosition(
      ({coords}) =>{
        this.userLocalitation=  [coords.latitude,coords.longitude]
      }
    )
  }
}

