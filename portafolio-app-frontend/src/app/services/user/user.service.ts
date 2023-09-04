import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { DataUserService } from './data-user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: User[] = [];
  usuarioCargado:User;

  private usuarioObs : BehaviorSubject<User> = new BehaviorSubject<User>({idUser:0, userName:'', email:'', password:''});

  constructor(private dataUser: DataUserService) { }

  setUserList(userList: User[]){
    this.userList = userList;
  }

  obtenerUsuarios(){
    return this.dataUser.cargarUsuarios();
  }

  agregarUsuario(usuario:User){
    this.dataUser.agregarUsuario(usuario).subscribe({
      next: (user:User): void =>{
        console.log('Se agrego los usuarios insertados al arreglo userList:' + user.userName);
        this.userList.push(user);
      }
    });
  }

  cargarUsuario(usuario:User){
    this.usuarioCargado = usuario;
    this.usuarioObs.next(this.usuarioCargado);
  }

  get usuarioObvs(){
    return this.usuarioObs.asObservable();
  }

  modificarUsuario(idUsuario:number, usuario:User){
    console.log('usuario a modificar:' + usuario.userName);

    const usuarioLocalModificar = this.userList.find(usuario => usuario.idUser == idUsuario);
    usuarioLocalModificar!.idUser = usuario.idUser;
    usuarioLocalModificar!.userName = usuario.userName;
    usuarioLocalModificar!.email = usuario.email;
    usuarioLocalModificar!.password = usuario.password;
    usuarioLocalModificar!.rol = usuario.rol;

    this.dataUser.modifiacarUsuario(idUsuario, usuario);
  }

  encontrarUsuario(id:number){
    const usuarioEncontrado = this.userList.find(usuario => usuario.idUser == id);
    if(usuarioEncontrado != null){
      console.log('usuario encontrado:' + usuarioEncontrado.userName);
    }
    return usuarioEncontrado;
  }

  eliminarUsuario(idUsuario:number){
    console.log('eliminar usuario con el id:' + idUsuario);
    /*const index = this.userList.findIndex(usuario => usuario.idUser == idUsuario);
    this.userList.slice(index, 1);*/

    const usuarioEliminado = this.userList.find(usuario => usuario.idUser == idUsuario);
    usuarioEliminado!.idUser = 0;
    usuarioEliminado!.userName = "";
    usuarioEliminado!.email = "";
    usuarioEliminado!.password = "";
    usuarioEliminado!.rol = "";

    this.dataUser.eliminarUsuario(idUsuario);
  }
}
