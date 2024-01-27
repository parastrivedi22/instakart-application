import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Instakart';

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = data && JSON.parse(data);
      this.productService.getCart(user.id);
    }
  }
}
