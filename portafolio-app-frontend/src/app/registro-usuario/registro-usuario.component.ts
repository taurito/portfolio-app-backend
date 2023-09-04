import { User } from './../services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
declare var $: any;

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  noMostrar:boolean = false;
  rolUsuario:string = '';
  registerForm = this.formBuilder.group({
    idUser:[0],
    userName:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    checkbox: [false, Validators.requiredTrue],
    rol:['', [Validators.required]]
  })
  passwordVisible:boolean = false;
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.usuarioObvs.subscribe(usuario =>{
      const idUser = usuario.idUser;
      if(idUser != null){
        const usuarioEncontrado = this.userService.encontrarUsuario(idUser);
        if(usuario != null){
          const user = {
            idUser: usuarioEncontrado?.idUser,
            userName: usuarioEncontrado?.userName,
            email: usuarioEncontrado?.email,
            password: usuarioEncontrado?.password,
            rol: usuarioEncontrado?.rol
          }

          this.registerForm.patchValue(user);
          console.log(this.registerForm.value)
          console.log(usuarioEncontrado);
        }
      }
    });
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
      if(usuario.rol === '1'){
          this.rolUsuario = 'administrador';
      }else{
        if(usuario.rol === '2') this.rolUsuario = 'invitado';
        else if(usuario.rol === '3') this.rolUsuario = 'usuario'
      }
      const usuarioGuardar = new User(usuario.idUser, usuario.userName, usuario.email, usuario.password, this.rolUsuario);
      console.log(usuarioGuardar);

      if(usuario.idUser != null){
        this.userService.modificarUsuario(usuario.idUser, usuarioGuardar);
        console.log('Se modifico el usuario:' + this.userName);
      }
      else{
        this.userService.agregarUsuario(usuarioGuardar);
        console.log('Se agrego el usuario:' + this.userName)
      }
      this.router.navigateByUrl('/admin/usuarios');
      $("#exampleModalRe").modal('hide');
      this.registerForm.reset();
    }
  }

  cancelar(){
    this.registerForm.reset();
    this.router.navigate(['./admin/usuarios']);
    $("#exampleModalRe").modal('hide');
  }

}
