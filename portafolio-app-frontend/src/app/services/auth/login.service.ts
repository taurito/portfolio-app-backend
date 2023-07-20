import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: User[] = [];

  currentUserLoginOn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({idUser:0, email:''});

  constructor(private http:HttpClient) { }

  urlBase = "http://localhost:8080/portafolio-app-backend/webservice/user";

  login(userLogin:LoginRequest):Observable<User>{

    let url: string;
    url = this.urlBase + '/' + userLogin.email + '/' + userLogin.password;
    return  this.http.get<User>(url).pipe(
      tap((userData:User)=>{

            this.currentUserLoginOn.next(true);
            this.currentUserData.next(userData);

      }),
      catchError(this.handleError)
    )

  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error("Se ha producido un error", error.error);
    }
    else{
      console.error("El backend retorno el codigo de estado", error.status, error.error);
    }
    return throwError(()=> new Error("Algo fallo, por favor intente de nuevo"));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }


}
