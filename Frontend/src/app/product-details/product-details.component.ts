import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  cartProducts: Product[] = [];
  isAdd: boolean = false;
  userType: string = '';
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((rs) => {
      this.product = rs
    })

    let cartData = localStorage.getItem('localCart')
    if (productId && cartData) {
      let cartItems = JSON.parse(cartData);
      cartItems = cartItems.filter((itm: Product) => productId == itm.id.toString())
      if (cartItems[0].id == productId) {
        this.isAdd = true
      }
    }



    let user = localStorage.getItem('user');
    if (user) {
      this.userType = user && JSON.parse(user).userType;
      let buyerId = user && JSON.parse(user).id;
      this.productService.getCart(buyerId);
      this.productService.cartData.subscribe((rs) => {
        let item = rs.filter((itm: any) => productId == itm.productId.toString())
        if (item.length) {
          this.isAdd = true
        }
      })
    }

    // this.productService.getCart(buyerId);
  }


  addToCart(product: Product) {
    if (!localStorage.getItem('user')) {
      this.productService.addToLocalStorage(product)
      this.isAdd = true

    } else {
      let user = localStorage.getItem("user");
      let buyerId = user && JSON.parse(user).id;

      let cartData: Cart = {
        ...this.product, buyerId, productId: product.id
        // productId: this.product.id
      }

      this.productService.addToCart(cartData).subscribe((rs) => {
        if (rs) {
          this.isAdd = true

          this.productService.getCart(buyerId);
          this.productService.cartData.subscribe();
        }
      })

    }
    this.productService.cartData.subscribe();

  }

  removeFromCart(productId: number) {

    let data = localStorage.getItem('user');

    if (!data) {
      this.isAdd = false
      this.productService.remobeFromLocalStorage(productId);
    }
    // else {
    //     this.productService.removeProductFromRemoteCart(productId).subscribe((rs) => {
    //       if (rs) {
    //         let user = localStorage.getItem("user");
    //         let buyerId = user && JSON.parse(user).id;
    //         this.productService.getCart(buyerId);
    //         this.isAdd = false

    //       }
    //     })
    //   }

    if (data) {
      let user = data && JSON.parse(data);
      this.productService.removeProductFromRemoteCart(productId, user.id)
        .subscribe({
          next: (rs) => { },
          error: (err) => { console.log(err) },
          complete: () => {
            //  this.ngOnInit();
            this.isAdd = false
            this.productService.getCart(user.id);
          }
        });

    }
  }
}
