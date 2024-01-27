import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  updateProductForm!: FormGroup;
  alertMsg: string = '';

  ngOnInit(): void {
    let prouductId = this.route.snapshot.paramMap.get('id');
    prouductId && this.productService.getProduct(prouductId).subscribe({
      next: (p: Product) => { console.log(p); this.updateProductForm.patchValue(p) }
    })
    // let seller = localStorage.getItem('seller');
    // let data = seller && JSON.parse(seller);
    // let sellerId = data.id;

    this.updateProductForm = this.formBuilder.group({
      id: [''],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCategory: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      productInStock: ['', Validators.required],
      sellerId: ['']
    })

  }


  onUpdateProduct() {
    let rs = this.productService.updateProduct(this.updateProductForm.value).subscribe(
      (rs) => {
        console.log(rs);
        if (rs != null) {
          this.alertMsg = "done";
          setTimeout(() => {
            this.router.navigate(["seller-home"]);
          }, 2000);
        }
        else {
          this.alertMsg = "err"
        }
      }
    );
  }

}
