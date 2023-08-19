import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartCount: number = 0;

    constructor(private cartService: CartService) {
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });
  }
}
