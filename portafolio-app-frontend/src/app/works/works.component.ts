import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card-service';
import { CardWorkModel } from '../card-work.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  cardList: CardWorkModel[] = [];
  idCardWork : number;
  cardEncontrado?: CardWorkModel;
  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.cardService.obtenerCardWork()
    .subscribe(
      (cardObtenidas: any) =>{
        //cargamos los datos de card obtenidas en el arreglo local
        this.cardList = cardObtenidas;
        this.cardService.setCards(this.cardList);
        console.log("cards obtenidas del subscribe:" + this.cardList);
      }
    );
  }

  irAgregar(){
    this.router.navigate(['./cardWorks/agregar']);
  }
  eliminarCard(card: CardWorkModel){
    const eliminar = confirm('Estas seguro de eliminar?');
    if(eliminar){
      this.cardService.eliminarCardWork(card.idCardWork);
      const cardEliminar = this.cardService.encontrarCardWork(card.idCardWork);
      const filteredArray = this.cardList.filter((item) => item !== cardEliminar);
      this.router.navigate(['admin/trabajos']);
    }
    
  }
}
