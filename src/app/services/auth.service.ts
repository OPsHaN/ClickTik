import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
//refresh the data from property when log in or log out
  private isUserLoggedObject:BehaviorSubject<boolean>


  constructor(private http: HttpClient ,private router:Router) {

  this.isUserLoggedObject=new BehaviorSubject<boolean>(this.isUserLogged);


   }

//login

login(username: string , password:string) {
    this.http.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password,
    })
      .subscribe({
        next: (response:any) => {
          console.log(response)
          alert("Welcome : "+username);
          // localStorage.setItem("token" ,response.token);
          localStorage.setItem("username" ,response.username);
          this.isUserLoggedObject.next(true);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error(error);
          alert("Your Details Is Wrong . Please Try again");
          this.router.navigate(['/login']);
        }
      });
  }

  //get the username

  getUserName(user: any , pw : any) {
    return user.userName;
    // return this.login(user , pw);

  }
//logout

  logout(){
    // localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.isUserLoggedObject.next(false);
  }

//check when user login and the token saved in localstorage

  get isUserLogged() {
// return (localStorage.getItem("token"))?true:false;
return (localStorage.getItem("username"))?true:false;

  }


  //refresh the data when login or logout
  getLoggedStatus():Observable<boolean>{
    return this.isUserLoggedObject.asObservable();
  }



}