import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Customer } from '../model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TrainApp/';


  constructor(private http: HttpClient) { }



  getAllStations() {
    return this.http.get(this.apiUrl + "GetAllStations");
  }


  getTrainSearch(from: number, to: number, date: string) {
    const url = 'https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations';
    debugger
    // Pass parameters as an object in the `params` option
    const params = {
      departureStationId: from.toString(),
      arrivalStationId: to.toString(),
      departureDate: date,
    };
    return this.http.get(url, { params });
  }

  createNewCustomer(obj: Customer) {
   // debugger
    //return this.http.post<APIResponse>('${this.apiUrl}AddUpdatePassengers', obj)
    return this.http.post<APIResponse>("https://freeapi.miniprojectideas.com/api/TrainApp/AddUpdatePassengers", obj)
  }
  onLogin(obj: any) {
    return this.http.post<APIResponse>("https://freeapi.miniprojectideas.com/api/TrainApp/login", obj)
  }

  onBookTrain(obj: any) {
    debugger
    return this.http.post<APIResponse>("https://freeapi.miniprojectideas.com/api/TrainApp/BookTrain", obj)
  }

}
