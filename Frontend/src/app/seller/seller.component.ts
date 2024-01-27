import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Login, Signup } from '../data-type';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Signup } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  toggle: boolean = false;
  alertToggle: string = "";

  toggler() {
    this.toggle = !this.toggle
  }


  constructor(private sellerService: SellerService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {

    let isSellerLogedIn = localStorage.getItem("isSellerLogedIn");
    if (isSellerLogedIn == 'true') {
      this.router.navigate(['seller-home'])
    }

    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
      userType: ["seller", [Validators.required]],
    })
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
      userType: ['seller', [Validators.required]],
    })

  }

  get f() { return this.signupForm.controls }
  get g() { return this.loginForm.controls }


  onLogin() {
    this.sellerService.login(this.loginForm.value).subscribe(
      {
        next: (response) => {
          localStorage.setItem("seller", JSON.stringify(response));
          localStorage.setItem('isSellerLogedIn', 'true')
          this.router.navigate(['seller-home'])
        },
        error: (rs) => {
          this.alertToggle = "err";
        },
        complete: () => { },
      }
    )
  }


  onSignup() {
    console.log(this.signupForm.value)
    this.sellerService.signup(this.signupForm.value).subscribe({
      error: () => { this.alertToggle = "wrong" },
      complete: () => {
        this.alertToggle = "done"
        setTimeout(() => {
          this.toggler();
          this.alertToggle = "";
        }, 3000);
      }
    })
  }


}




