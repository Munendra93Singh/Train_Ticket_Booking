import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SearchComponent } from './Pages/search/search.component';
import { checkoutGuard } from './AuthGourd/checkout.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate:[checkoutGuard]
  },  
  {
    path: 'search/:fromStationId/:toStationId/:dateOfTravel',
    component: SearchComponent,
    canActivate:[checkoutGuard]
  }
];
