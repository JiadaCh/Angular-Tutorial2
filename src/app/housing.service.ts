import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  //ejecutar primero json-server --watch db.json en el terminal
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
    let list = localStorage.getItem("client");
    let client:User={
      firstName:firstName,
      lastName:lastName,
      email:email
    }
    if (list){
      list = list.slice(0,list.length-1)
      list+=","+JSON.stringify(client)+"]"

      localStorage.setItem("client",list)
    }else{

      localStorage.setItem("client",`[${JSON.stringify(client)}]`)
    }
  }
}

