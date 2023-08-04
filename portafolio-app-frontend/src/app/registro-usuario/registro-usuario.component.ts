import { User } from './../services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
declare var $: any;

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  idUser:number;
  registerForm = this.formBuilder.group({
    userName:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    checkbox: [false, Validators.requiredTrue],
    rol:['', [Validators.required]]
  })
  passwordVisible:boolean = false;
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  get userName(){
    return this.registerForm.controls.userName;
  }

  get email(){
    return this.registerForm.controls.email;
  }

  get password(){
    return this.registerForm.controls.password;
  }

  get checkbox(){
    return this.registerForm.controls.checkbox;
  }

  get rol(){
    return this.registerForm.controls.rol;
  }

  mostrarContrasena() {
  const passwordField = document.getElementById("passwordField") as HTMLInputElement;

  if (this.passwordVisible) {
    passwordField.type = "password";

  } else {
    passwordField.type = "text";
  }

  this.passwordVisible = !this.passwordVisible;
  }

  registrarUsuario(){
    if(this.registerForm.valid){
      const usuario = this.registerForm.value as User;
      const usuarioGuardar = new User(this.idUser, usuario.userName, usuario.email, usuario.password, usuario.rol);
      console.log(usuarioGuardar);
      this.loginService.agregarUsuario(usuarioGuardar).subscribe({
        next:(userData)=>{
          console.log("formulario guardado:" + userData);
        },
        error: (errorData) =>{
          console.log("error de guardado" + errorData)
        },
        complete: () =>{
          console.log(usuarioGuardar);
          this.router.navigateByUrl('/home');
          $("#exampleModalRe").modal('hide');
          this.registerForm.reset();
        }
      })

    }
  }

  cancelar(){
    this.registerForm.reset();
    this.router.navigate(['./home']);
    $("#exampleModalRe").modal('hide');
  }

}
