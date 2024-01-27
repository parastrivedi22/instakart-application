import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  imageFile!: File;
  alertMsg: string = '';
  loading: boolean = false;

  constructor(private productService: ProductService,
    private formBuild: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    let seller = localStorage.getItem('seller');
    let data = seller && JSON.parse(seller);
    let sellerId = data.id;

    this.addProductForm = this.formBuild.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCategory: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      productInStock: ['', Validators.required],
      sellerId: [sellerId],
    })
  }

  get f() { return this.addProductForm.controls }

  onAddProduct() {
    if (this.imageFile != null) {
      this.productService.addNewProduct(this.addProductForm.value, this.imageFile).subscribe({ next: (res) => { }, error: (err) => { this.alertMsg = "error"; }, complete: () => { this.alertMsg = "added"; this.loading = true; setTimeout(() => { this.loading = false; this.router.navigate(['seller-home']) }, 2000) } })
      // this.productService.addProduct(this.addProductForm.value).subscribe((rs) => { })
    } else {
      this.alertMsg = "error";
    }
  }

  onChageFile(data: any) {
    this.imageFile = data.target.files[0];
  }

}
