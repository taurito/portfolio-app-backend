import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card-service';
import { CardWorkModel } from '../card-work.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  cardList: CardWorkModel[] = [];
  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute) { }

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
}
