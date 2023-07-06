import { LoginService } from './../services/auth/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy{
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService) {

  }
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    const nav = document.querySelector('.container_header');

    window.addEventListener('scroll', function(){
      nav?.classList.toggle('active', window.scrollY>0)
    });

    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }


}
