import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  constructor(private httpclient: HttpClient) { }

  urlBase = "http://localhost:8080/portafolio-app-backend/webservice/user"

  cargarUsuarios(){
    return this.httpclient.get(this.urlBase);
  }

  agregarUsuario(usuario:User){
    return this.httpclient.post(this.urlBase, usuario);
  }

  modifiacarUsuario(idUsuario: number, usuario:User){
    let url:string;
    url = this.urlBase + '/' + idUsuario;

    this.httpclient.put(url, usuario).subscribe({
      next: respuesta => console.log('Resultado de modificar un usuario:' + respuesta),
      error: error => console.log('error de modificar un usuario:' + error)
    });
  }

  eliminarUsuario(idUsuario:number){
    let url:string;
    url = this.urlBase + '/' + idUsuario;

    this.httpclient.delete(url).subscribe({
      next: respuesta => console.log('Resultado de eliminar un usuario:' + respuesta),
      error: error => console.log('Error de eliminar un usuario:' + error)
    });
  }
}
