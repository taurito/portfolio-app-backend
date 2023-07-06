import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CardWorkModel } from "./card-work.model";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient){}

  urlBase = "http://localhost:8080/portafolio-app-backend/webservice/card";

  cargarCardWork(){
    return this.httpClient.get(this.urlBase);
  }

  agregarCardWork(card: CardWorkModel){
    return this.httpClient.post(this.urlBase, card);
  }

  modificarCardWork(idCarWork: number, card: CardWorkModel){
    let url: string;
    url = this.urlBase + '/' + idCarWork;

    this.httpClient.put(url, card)
      .subscribe({
        next: response => console.log('Resultado de modificar card:' + response),
        error: error => console.log('Error de modificar card' + error)
      });
  }

  eliminarCardWork(idCardWork: number){
    let url: string;
    url = this.urlBase + '/' + idCardWork;

    this.httpClient.delete(url)
      .subscribe({
        next: reponse => console.log('Resultado de eliminar card' + reponse),
        error: error => console.log('Resultado de eliminar un card' + error)
      });
  }
}

