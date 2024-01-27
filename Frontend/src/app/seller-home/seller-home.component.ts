import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productsList!: Product[];
  trashIcon = faTrashAlt;
  updateIcon = faEdit;
  sellerId!: string;
  loading: boolean = false;

  constructor(private productService: ProductService,) { }
  ngOnInit(): void {
    let seller = localStorage.getItem('seller');
    let data = seller && JSON.parse(seller);
    this.sellerId = data.id;
    this.list();
  }


  list() {
    this.productService.sellerProductList(this.sellerId).subscribe((products) => { this.productsList = products });

  }

  onRemove(id: number) {
    let rs = this.productService.removeProduct(id).subscribe();
    if (rs) {
      // this.list();
      this.loading = true;
      setTimeout(() => { this.loading = false; this.ngOnInit() }, 2000)
    }
  }


}
