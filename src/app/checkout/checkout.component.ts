import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from './order.model';
import { OrderResponse } from './orderResponse.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  order: Order = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: ''
  };

  responseMessage: string = '';
  isSuccess: boolean = true;

  constructor(private orderService: OrderService) { }

onCheckoutSubmit(): void {
      if (!this.validateOrderFields()) {
        return;
    }
  this.orderService.placeOrder(this.order).subscribe(
    (response: OrderResponse) => {
      this.isSuccess=true;
      this.responseMessage = "Order successfully placed!";
    },
    error => {
      this.isSuccess=false;
      this.responseMessage = error.error.Object;
    }
  );
}

validateOrderFields(): boolean {
  if (!this.order.firstName.trim()) {
    this.isSuccess=false;
    this.responseMessage = 'First name is required';
    return false;
  }
  if (!this.order.lastName.trim()) {
    this.isSuccess=false;
    this.responseMessage = 'Last name is required';
    return false;
  }
  if (!this.order.address.trim()) {
    this.isSuccess=false;
    this.responseMessage = 'Address is required';
    return false;
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!this.order.email.trim()) {
      this.isSuccess = false;
      this.responseMessage = 'Email is required';
      return false;
  } else if (!emailPattern.test(this.order.email.trim())) {
      this.isSuccess = false;
      this.responseMessage = 'Invalid email format';
      return false;
  }
  if (!this.order.phone.trim()) {
    this.isSuccess=false;
    this.responseMessage = 'Phone is required';
    return false;
  }
  return true;
}

}
