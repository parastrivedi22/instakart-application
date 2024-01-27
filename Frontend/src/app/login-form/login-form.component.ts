import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Cart, Product, Signup } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  alertMsg: boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
      userType: ['buyer', [Validators.required]]

    })

  }

  get g() { return this.loginForm.controls }
  // onLogin() {
  //   this.userService.login(this.loginForm.value).subscribe((rs: Signup) => {
  //     if (rs != null) {
  //       localStorage.setItem("user", JSON.stringify(rs));
  //       localStorage.setItem('isUserLogedIn', 'true')
  //       this.router.navigate(['/'])
  //       this.localCartToRemoteCart();
  //     } else {
  //       this.alertMsg = true
  //     }
  //   });
  // }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (rs: Signup) => {
        localStorage.setItem("user", JSON.stringify(rs));
        localStorage.setItem('isUserLogedIn', 'true')
        this.router.navigate(['/'])
        this.productService.getCart(rs.id);
        console.log("login doneee")
        this.localCartToRemoteCart();
      },
      error: (rs) => { console.log(rs); this.alertMsg = true },
      complete: () => { }
    })
  }


  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      let userData = localStorage.getItem('user');
      let buyerId = userData && JSON.parse(userData).id;

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          buyerId
        }


        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((rs) => {
            console.log(rs)
          })

          if (cartDataList.length === index + 1) {
            console.log("cart has removed ")
            localStorage.removeItem('localCart');
          }

        }, 500)
      });

    }
  }
}