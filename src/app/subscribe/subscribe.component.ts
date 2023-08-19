import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  private apiUrl = 'http://localhost:8081/subscribe/add'; 
  outputMessage: string = '';
  isSuccess: boolean | null = null;  // Set to null initially

  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      name: (<HTMLInputElement>document.getElementById('name')).value,
      email: (<HTMLInputElement>document.getElementById('email')).value
    };

    this.http.post(this.apiUrl, data).subscribe(
      (response) => {
        console.log('Subscription successful', response);
        this.outputMessage = 'Successfully subscribed! Thank you.';
        this.isSuccess = true;
        setTimeout(() => {
          this.outputMessage = '';
        }, 5000);
      },
      (error) => {
        this.isSuccess = false;
        if(error.error.message == 'Cannot insert duplicate key'){
          this.outputMessage = 'You are already a subscriber!';
        } else{
          this.outputMessage = 'Subscription failed';
        }
        setTimeout(() => {
          this.outputMessage = '';
        }, 5000);
      }
    );
  }
}
