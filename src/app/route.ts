import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import {MapComponent} from "./map/map.component";
//añadir clima para mapa
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'details/:id/map',
    component: MapComponent,
    title: 'Map'
  }
];

export default routeConfig;
