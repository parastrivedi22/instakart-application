import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: Product[];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.producstList().subscribe((products) => { this.products = products })
  }
}
