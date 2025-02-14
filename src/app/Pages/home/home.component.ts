import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import { Istantion } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  trainservice = inject(TrainService);
  router = inject(Router);
  stationList: Istantion[] = [];

  fromStationID: number = 0;
  toStationID: number = 0;
  dateofTravel: string = '';

  ngOnInit(): void {
    this.loadAllStation();
  }
  loadAllStation() {
    debugger
    this.trainservice.getAllStations().subscribe((res: any) => {
      this.stationList = res.data;
    })
  }

  onSearch() {
    if (this.fromStationID == 0 || this.toStationID == 0 || this.dateofTravel == '') {
      alert("Select Your Journy Details ")
    } else {
      if (this.fromStationID == this.toStationID) {
        alert("from and To station is not Same");
      } else {
        this.router.navigate(['/search', this.fromStationID, this.toStationID, this.dateofTravel])
      }
    }
  }
}
