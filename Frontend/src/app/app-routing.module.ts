import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SignupComponent } from './signup/signup.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "seller", component: SellerComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginFormComponent },
  { path: "seller-home", component: SellerHomeComponent, canActivate: [authGuard] },
  { path: "seller-add-product", component: SellerAddProductComponent, canActivate: [authGuard] },
  { path: "seller-update-product/:id", component: SellerUpdateProductComponent, canActivate: [authGuard] },
  { path: "search/:q", component: SearchComponent },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "view-cart", component: ViewCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
