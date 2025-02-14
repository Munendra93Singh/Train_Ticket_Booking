import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse, Customer, Istantion, ITrain, Search } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [DatePipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  activedRoute = inject(ActivatedRoute);
  trainerService = inject(TrainService);
  searchData: Search = new Search();
  trainList: ITrain[] = [];
  stationList: Istantion[] = [];
  selectedTrain?: ITrain;
  // =========Booking
  passenger: any = {
  //  "passangerName1" : "",
    "age": "",
    //"passangerName" : "",
 }
  passengerList: any[] = [];

  
  loagedUserData: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('trainApp');
    if (localData != null) {
      this.loagedUserData = JSON.parse(localData)
    }
    this.activedRoute.params.subscribe((res: any) => {
      debugger;
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;
      this.searchData.dateOfTravel = res.dateOfTravel;
      this.getSearchTrains();
    })
  }
  ngOnInit(): void {
    this.loadAllStation();
  }
  loadAllStation() {
    this.trainerService.getAllStations().subscribe((res: any) => {
      this.stationList = res.data;
    })
  }

  getSearchTrains() {
    return this.trainerService.getTrainSearch(this.searchData.fromStationId, this.searchData.toStationId, this.searchData.dateOfTravel).subscribe((res: any) => {
      debugger
      this.trainList = res.data;
    })
  }
  openBookModel(train: ITrain) {
    this.selectedTrain = train;
    const model = document.getElementById("myBookModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeBookModel() {
    const model = document.getElementById("myBookModal");
    if (model != null) {
      model.style.display = 'none'
    }
  }

  addPassenger() {
    debugger
    const strObj = JSON.stringify(this.passenger);
    const parseObj = JSON.parse(strObj);
    this.passengerList.push(parseObj);
  }
  
    bookTickets() {
      debugger;
      const bookingObj = {
        bookingId: 0,
        trainId: this.selectedTrain?.trainId,
        passengerId: this.loagedUserData.passengerID,
        travelDate: this.searchData.dateOfTravel,
        bookingDate: new Date(),
        totalSeats: 0,
        TrainAppBookingPassengers: [] as any
      };
      bookingObj.TrainAppBookingPassengers = this.passengerList;
      bookingObj.totalSeats = this.passengerList.length;
      this.trainerService.onBookTrain(bookingObj).subscribe((re: APIResponse)=> {
        if (re.result) {
          alert("Ticket Booking Successfuly")
        } else {
         alert (re.message)
        }
      })
    }









  // bookTickets() {
  //   // Validate required fields
  //   debugger
  //   if (!this.selectedTrain || !this.loagedUserData || !this.searchData.dateOfTravel || !this.passengerList) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   // Construct booking object
  //   const bookingObj = {
  //     bookingId: 0,
  //     trainId: this.selectedTrain.trainId,
  //     passengerId: this.loagedUserData.passengerID,
  //     travelDate: this.searchData.dateOfTravel,
  //     bookingDate: new Date(),
  //     totalSeats: this.passengerList.length,
  //     TrainAppBookingPassengers: this.passengerList
  //   };

  //   // Call service to book tickets
  //   this.trainerService.onBookTrain(bookingObj).subscribe(
  //     (re: APIResponse) => {
  //       if (re.result) {
  //         alert("Ticket Booked Successfully");
  //       } else {
  //         alert(re.message);
  //       }
  //     },
  //     (error) => {
  //       alert("An error occurred while booking. Please try again.");
  //       console.error(error);
  //     }
  //   );
  // }
}
