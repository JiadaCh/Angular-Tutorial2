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
      console.log("No se ha encontrado la localización")
      return [0,0]
    }

  }

  public getUserLocation(){

    navigator.geolocation.getCurrentPosition(
      ({coords}) =>{
        this.userLocalitation=  [coords.latitude,coords.longitude]
      },
      ()=>{
        this.userLocalitation =[0,0];
        console.log("No se ha encontrado la geolocalización")
      }
    )
  }
}

