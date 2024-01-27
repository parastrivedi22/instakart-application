import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Login, Signup } from '../data-type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient, private router: Router) { }

  // private BASE_URL: String = 'http://localhost:3000/seller';
  private BASE_URL: String = 'http://localhost:8080/user';
  signup(data: Signup) {
    return this.http.post(`${this.BASE_URL}`, data,);


  }
  // http://localhost:3000/seller?userPassword=1234&userEmail=a@gmail.com

  public login(data: Login) {
    const params = new HttpParams().set('data', JSON.stringify(data));
    return this.http.get<any>(`${this.BASE_URL}/login`, { params })
  }

}

