import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { Cart } from './cart/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sneaker-shop-fe';

  constructor(private cookieService: CookieService,
    private cartService:CartService,
    private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkSessionAndResetCount();
      }
    });
  }

  ngOnInit() {
    this.fetchAndSetCartCount();
    }

  checkSessionAndResetCount() {
    if (!this.cookieService.check('sessionId')) {
      sessionStorage.setItem('cartItemsCount', '0');
      this.cartService.updateCartCount(0);
    }
  }

  fetchAndSetCartCount() {
    this.cartService.getCart().subscribe(
      (response: Cart) => {
        let totalCount = 0;
        const productsMap = new Map(Object.entries(response.products));
        for(let quantity of productsMap.values()) {
          totalCount += quantity;
        }
        sessionStorage.setItem('cartItemsCount', totalCount.toString());
        this.cartService.updateCartCount(totalCount);
      },
      (error) => {
        console.error("Failed to fetch the cart:", error);
      }
    );
  }
}
