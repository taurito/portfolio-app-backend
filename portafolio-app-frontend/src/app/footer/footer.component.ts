import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userLoginOn:boolean=false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

}
