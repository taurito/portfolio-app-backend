import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  userList:User[] = [];
  indice:number = 0;
  idUsuario: number;

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe({
      next:(usuariosObtenidos: any) =>{
        this.userList = usuariosObtenidos;
        this.userService.setUserList(this.userList);
        console.log('usuarios obtenidos:' + this.userList);
      }
    })
  }

  cargarUsuario(usuario:User){
    this.userService.cargarUsuario(usuario);
  }

  eliminarUsuario(usuario: User){
    const eliminar = confirm('Estar seguro de eliminar usuario?');

    if(eliminar){
      this.userService.eliminarUsuario(usuario.idUser!);
      let index = this.userList.findIndex(index => index.idUser == usuario.idUser);
      this.userList.splice(index, 1);
      this.router.navigate(['admin/usuarios']);
    }
  }

}
