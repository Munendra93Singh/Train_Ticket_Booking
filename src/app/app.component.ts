import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponse, Customer } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  registerObj: Customer = new Customer();
  trainService = inject(TrainService);

  loginObj: any = {
    phone: '',
    password: ''
  }
  
  loggedUser: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('trainApp');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData)
    }
  }
  openRegister() {
    const model = document.getElementById("registerModel");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  openLogin() {
    const model = document.getElementById("loginModel");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeRegister() {
    const model = document.getElementById("registerModel");
    if (model != null) {
      model.style.display = 'none'
    }
  }
  closeLogin() {
    const model = document.getElementById("loginModel");
    if (model != null) {
      model.style.display = 'none'
    }
  }

  onRegister() {
    debugger
    this.trainService.createNewCustomer(this.registerObj).subscribe((res: APIResponse) => {
      if (res.result) {
        // debugger
        alert("Registration Successfully")
        this.closeRegister();
      } else {
        alert(res.message);
      }
    })
  }

  OnLogin() {
    //debugger
    this.trainService.onLogin(this.loginObj).subscribe((res: APIResponse) => {
      if (res.result) {
        alert("login Successfully")
        localStorage.setItem('trainApp', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeLogin();
      } else {
        alert(res.message);
      }
    })
  }

  onLogOff() {
    this.loggedUser = new Customer();
    localStorage.removeItem('trainApp')
  }
}
