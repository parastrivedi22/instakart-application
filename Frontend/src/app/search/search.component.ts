import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('q');
    query && this.productService.searchProducts(query).subscribe((rs) => { this.products = rs });
  }


}
