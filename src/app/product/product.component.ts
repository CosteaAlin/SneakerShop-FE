import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  public products: Product[] = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => this.productService.getProductsByGender(params['gender']))
      )
      .subscribe(products => {
        this.products = products;
      });
  }
  
   public getProductsByGender(gender: string): void{
    this.productService.getProductsByGender(gender).subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
   }
}
