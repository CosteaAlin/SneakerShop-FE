import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Product } from '../product/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from '../cart/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  public product: Product = {'id': NaN, name: '',  price: NaN, description: '',  image: '', sizes: []};
  public selectedSize: number | null = null;
  public notificationMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId){
      this.getProductDetails(productId);
    }
  }

  public getProductDetails(id: string): void {
    this.productService.getProduct(id).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  selectSize(size: number): void {
    this.selectedSize = size;
  }

  addToCart(productId: number, quantity: number): void {
    if (this.selectedSize === null) {
      alert('Please select a size first!');
      return;
    }
    this.cartService.updateCart(productId, this.selectedSize, quantity).subscribe(
      (response: Cart) => {
        this.notificationMessage= 'Product added to cart!';
        setTimeout(() => {
          this.notificationMessage = null;
        }, 5000);

        let totalCount = 0;
        const productsMap = new Map(Object.entries(response.products));
        for(let quantity of productsMap.values()) {
          totalCount += quantity;
        }
        sessionStorage.setItem('cartItemsCount', totalCount.toString());
        this.cartService.updateCartCount(totalCount);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
