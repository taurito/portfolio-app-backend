import { LoginService } from './../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../services/auth/loginRequest';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string="";
  loginForm = this.formBuilder.group({
    usuario:['', [Validators.required]],
    password:['', [Validators.required]],
  })
  constructor(private formBuilder:FormBuilder, private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  get usuario(){
    return this.loginForm.controls.usuario;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData)=> {
          console.log(userData);
        },
        error: (errorData) =>{
          console.log(errorData);
          this.loginError=errorData;
        },
        complete: () =>{
          console.info("Login completo");
          this.router.navigate(['./sobreMi']);
          $("#exampleModal").modal('hide');
          this.loginForm.reset();
        }
      })

      //this.router.navigateByUrl('/sobreMi');
    }
    else{
      alert("error al ingresar los datos")
    }
  }


  cerrar(){
    this.loginForm.reset();
  }
}
