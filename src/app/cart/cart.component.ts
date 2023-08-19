import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart/cart.model';
import { CartItem } from '../cart/cartItem.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];

  constructor(
      private cartService: CartService,
      private productService: ProductService
    ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  public getCartItems(){
    this.cartService.getCart().subscribe(
      (response: Cart) => {
        const products = new Map<string, number>(Object.entries(response.products));
        products.forEach((quantity, key) => {
          let splitKey = key.split('_');
          let id = parseInt(splitKey[0]);
          let size = parseInt(splitKey[1]);

          this.productService.getProduct(id.toString()).subscribe(
            productResponse => {
              const cartItem: CartItem = {
                product: {
                  id: productResponse.id, 
                  name: productResponse.name, 
                  price: productResponse.price, 
                  image: productResponse.image
                },
                size: size,
                quantity: quantity
              }
              this.cartItems.push(cartItem); 
            }
          )

      });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
}

  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
    this.updateCartWithNewQuantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartWithNewQuantity(item);
    } else {
      this.removeItemFromCart(item);
    }
  }

  removeItemFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(cartItem => 
      cartItem.product.id === item.product.id && cartItem.size === item.size
    );
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartService.removeItemFromCart(item.product.id, item.size).subscribe(
      (response:Cart) => {
        this.updateCartItemCount(response);
      }
    );
  }
  
  private updateCartWithNewQuantity(item: CartItem): void {
    this.cartService.updateCart(item.product.id, item.size, item.quantity).subscribe(
      (response: Cart) => {
        this.updateCartItemCount(response);
      },
      (error) => {
        console.error("Error updating cart:", error);
      }
    );
  }
  
  private updateCartItemCount(response: Cart): void {
    let totalCount = 0;
    const productsMap = new Map(Object.entries(response.products));
    for(let quantity of productsMap.values()) {
      totalCount += quantity;
    }
    sessionStorage.setItem('cartItemsCount', totalCount.toString());
    this.cartService.updateCartCount(totalCount);
  }
  
}
