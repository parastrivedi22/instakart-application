import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  productList: Cart[] = [];
  grandTotal: number = 0;
  isEmpty: boolean = false;
  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    let userData = localStorage.getItem('user')
    if (userData) {
      let buyerId = JSON.parse(userData).id;
      this.productService.currentCart(buyerId).subscribe((rs) => {
        this.productList = rs;
        this.calculateSum();
        this.productService.getCart(buyerId);
      })
    } else {
      let data = localStorage.getItem("localCart")
      this.productList = data && JSON.parse(data);
      this.calculateSum();
    }


  }

  calculateSum() {
    this.isEmpty = this.productList.length <= 0 ? true : false;
    this.grandTotal = 0;
    this.productList.forEach((prd) => {
      this.grandTotal = this.grandTotal + prd.productPrice * prd.productQuantity
    })
  }


  quantity(q: String, product: Cart) {

    if (product.productQuantity > 1) {
      if (q == 'desc') {
        product.productQuantity--;
        this.productService.updateCartProductQuantity(product).subscribe({
          next: (rs) => { console.log(rs) },
          error: (error) => { },
          // complete: () => { this.productService.getCart(product.buyerId) }
          complete: () => { this.calculateSum() }
        })
        console.log(product);
      }
    }
    if (product.productQuantity < 8) {
      if (q == 'incs') {
        product.productQuantity++;
        this.productService.updateCartProductQuantity(product).subscribe({
          next: (rs) => { console.log(rs) },
          error: (error) => { },
          // complete: () => { this.productService.getCart(product.buyerId) }
          complete: () => { this.calculateSum() }

        })

      }
    }
  }


  removeFromCart(product: Product) {
    let data = localStorage.getItem('user');
    let user = data && JSON.parse(data);
    if (data) {
      this.productService.removeProductFromRemoteCart(product.productId, user.id)
        .subscribe({
          next: (rs) => { console.log(rs) },
          error: (err) => { console.log(err) },
          complete: () => { this.ngOnInit(); }
        });
    } else {
      this.productService.remobeFromLocalStorage(product.id)
    }
    this.grandTotal = this.grandTotal - product.productPrice;
    this.ngOnInit();
  }

}
