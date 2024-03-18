import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usermodel } from '../shared/models/user-model';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
const USER_KEY = 'User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<usermodel>(this.getfromlocalstorage());
  public userObservable:Observable<usermodel>;
  constructor(private http:HttpClient, private toastrservice : ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin : UserLogin): Observable<usermodel>{
    return this.http.post<usermodel>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.settolocalstorage(user);
          this.userSubject.next(user);
          this.toastrservice.success(
            `welcome to Foodmine ${user.name}!`,
            'login succesful'
          )

        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error, 'login failed')
        }
      })
    )
   }
   private settolocalstorage(user:usermodel){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  private getfromlocalstorage():usermodel{
    const userjson = localStorage.getItem(USER_KEY);
    if(userjson) return JSON.parse(userjson) as usermodel;
    return new usermodel();
  }

  logout(){
    this.userSubject.next(new usermodel());
    localStorage.removeItem(USER_KEY)
    window.location.reload();
  }
}
