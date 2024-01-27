import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: String = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  signUser(data: Signup) {
    return this.http.post(`${this.BASE_URL}`, data,)

  }

  // loginUser(data: Login) {
  //   // return this.http.get<Singup>(`${this.BASE_URL}?userPassword=${data.userPassword}&userEmail=${data.userEmail}`)
  //   return this.http.get(`http://localhost:3000/user?userPassword=1234&userEmail=p@g.com`, { observe: "response" });
  // }


  public login(data: Login) {
    // let rs = this.http.get(`${this.BASE_URL}?userPassword=${data.userPassword}&userEmail=${data.userEmail}`, { observe: 'response' })
    const params = new HttpParams().set('data', JSON.stringify(data));
    return this.http.get<any>(`${this.BASE_URL}/login`, { params })




    // let rs = this.http.get(`${this.BASE_URL}?userPassword=${data.userPassword}&userEmail=${data.userEmail}`, { observe: 'response' })
    // return rs;
  }
}
