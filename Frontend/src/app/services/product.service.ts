import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, } from '../data-type';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private BASE_URL: String = 'http://localhost:3000/products';
  private BASE_URL: String = 'http://localhost:8080';
  cartData = new EventEmitter<Product[]>();
  constructor(private httpClient: HttpClient) { }

  addNewProduct(product: Product, file: any) {
    let data = new FormData();
    data.append("file", file);
    data.append("product", JSON.stringify(product));
    return this.httpClient.post(`${this.BASE_URL}/product/new`, data);
  }
  producstList() {
    return this.httpClient.get<Product[]>(`${this.BASE_URL}/product`);
  }
  sellerProductList(id: string) {
    return this.httpClient.get<Product[]>(`${this.BASE_URL}/product/s/${id}`);
  }
  getProduct(id: String) {
    return this.httpClient.get<Product>(`${this.BASE_URL}/product/${id}`);
  }
  updateProduct(product: Product) {
    return this.httpClient.put(`${this.BASE_URL}/product/update`, product);
  }
  removeProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/product/delete/${productId}`);
  }
  // removeProduct(data: number): Observable<void> {
  //   const params = new HttpParams().set("data", JSON.stringify(data))
  //   return this.httpClient.delete<void>(`${this.BASE_URL}/product/delete`, { params });
  // }

  searchProducts(query: String) {
    return this.httpClient.get<Product[]>(`${this.BASE_URL}/products/search?query=${query}`)
  }


  getCart(buyerId: number) {
    return this.httpClient.get<Product[]>(`${this.BASE_URL}/cart/${buyerId}`, { observe: "response" })
      .subscribe((rs) => {
        if (rs && rs.body) {
          this.cartData.emit(rs.body)
        }
      });
  }
  currentCart(buyerId: number) {
    return this.httpClient.get<Cart[]>(`${this.BASE_URL}/cart/${buyerId}`);

  }
  addToCart(data: Cart) {
    return this.httpClient.post(`${this.BASE_URL}/cart/add`, data);

  }


  removeProductFromRemoteCart(productId: number, buyerId: number) {
    const params = new HttpParams().set("buyerId", buyerId).set("productId", productId);
    return this.httpClient.delete<void>(`${this.BASE_URL}/cart/delete`, { params });
  }

  // removeProductFromRemoteCart(productId: number, buyerId: number) {
  //   let data: any = { "productId": productId, "buyerId": buyerId };
  //   console.log(data)
  //   const params = new HttpParams().set("data", JSON.stringify(data));
  //   return this.httpClient.delete<void>(`${this.BASE_URL}/cart/delete`, { params });
  // }


  updateCartProductQuantity(cartItem: Cart) {
    return this.httpClient.put(`${this.BASE_URL}/cart/updateQuantity`, cartItem);
    // return this.httpClient.put('http://localhost:3000/cart/' + cartItem.productId, cartItem);
  }



  // ______________________________________________________________

  addToLocalStorage(product: Product) {
    let localCart = [];
    let cartData = localStorage.getItem('localCart')
    if (!cartData) {
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else {
      localCart = JSON.parse(cartData);
      localCart.push(product);
      localStorage.setItem('localCart', JSON.stringify(localCart));
    }

    this.cartData.emit(localCart);
  }

  remobeFromLocalStorage(productId: number) {
    let localCart = [];
    let cartData = localStorage.getItem('localCart')
    let cartItems = cartData && JSON.parse(cartData);
    localCart = cartItems.filter((itm: Product) => productId != itm.id)
    localStorage.setItem('localCart', JSON.stringify(localCart));
    this.cartData.emit(localCart);
  }


  // addProduct(product: FormData) {
  //   return this.httpClient.post(`${this.BASE_URL}`, product);

  // }

}


