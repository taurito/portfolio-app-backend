import { Injectable } from '@angular/core';
import { CardWorkModel } from './card-work.model';
import { DataService } from './data-service';


@Injectable()
export class CardService {
  cardList: CardWorkModel[] = [];

  constructor(private dataService: DataService){}

  //se utiliza para modificar el valor del arreglo debido a la llamada asincrona
  setCards(cardList: CardWorkModel[]){
    this.cardList = cardList;
  }

  obtenerCardWork(){
    return this.dataService.cargarCardWork();
  }

  agregarCardWork(card: CardWorkModel){
    console.log('card a agregar:' + card.titulo);
    this.dataService.agregarCardWork(card)
    .subscribe(
      (card:any) => {
        console.log('Se agrega al arreglo las cards recien insertadas:' + card.idCardWork);
        this.cardList.push(card);
      }
    );
  }

  encontrarCardWork(id:number){
    const cardWork = this.cardList.find(cardWork => cardWork.idCardWork == id);
      if(cardWork != undefined){
        console.log('card encontrada:' + cardWork.idCardWork + ' ' + cardWork.titulo);
      }
    return cardWork;
  }

  modificarCardWork(id:number, card: CardWorkModel){
    console.log('card a modificar:' + card.idCardWork);
    // se actualiza el objeto cardWorkModel del arreglo
    const cardModificadaLocal = this.cardList.find(card => card.idCardWork == id);
    cardModificadaLocal!.idCardWork = card.idCardWork;
    cardModificadaLocal!.titulo = card.titulo;
    this.dataService.modificarCardWork(id, card);
  }

  eliminarCardWork(id:number){
    console.log('eliminar card con id:' + id);
    const index = this.cardList.findIndex(card => card.idCardWork == id); //encontramos el indice en el arreglo
    this.cardList.slice(index, 1);
    this.dataService.eliminarCrdWork(id);
  }
}
