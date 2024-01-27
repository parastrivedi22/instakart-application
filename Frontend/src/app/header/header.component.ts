import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  manuType: String = 'default';
  name: string = 'hello';
  cartItemCount: number = 0;
  searchList!: Product[];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("isSellerLogedIn") == 'true') {
          this.manuType = 'seller'
        }

      } else if (localStorage.getItem("isUserLogedIn") == 'true') {
        this.manuType = 'user'
      }
    });
    if (localStorage.getItem('seller')) {
      this.manuType = 'seller'
      let seller = localStorage.getItem('seller');
      let data = seller && JSON.parse(seller);
      this.name = data.fullName;
    } else if (localStorage.getItem('user')) {
      this.manuType = 'user'
      let user = localStorage.getItem('user');
      let data = user && JSON.parse(user);
      this.name = data.fullName;
    } else {
      this.manuType = 'default'
    }


    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItemCount = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((rs) => { this.cartItemCount = rs.length })

  }


  onLogout() {

    if (localStorage.getItem("isUserLogedIn") == 'true') {
      localStorage.removeItem('user');
      localStorage.removeItem('isUserLogedIn');
      this.manuType = 'default'
      this.router.navigate(['/']);
      this.productService.cartData.emit([]);
    }


    if (localStorage.getItem("isSellerLogedIn") == 'true') {
      localStorage.removeItem('seller');
      localStorage.removeItem('isSellerLogedIn');
      this.manuType = 'default'
      this.router.navigate(['/']);
    }

    this.ngOnInit();

  }


  onSearch(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    this.productService.searchProducts(element.value).subscribe((rs) => {
      if (rs.length > 5) {
        rs.length = 5;
      }
      this.searchList = rs
    })
  }

  onReset() {
    this.searchList = [];
  }


  submitSearch(q: String) {
    this.router.navigate([`search/${q}`])
  }
}
