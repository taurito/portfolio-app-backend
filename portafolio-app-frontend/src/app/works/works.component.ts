import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card-service';
import { CardWorkModel } from '../card-work.model';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  userLoginOn:boolean=false;
  cardList: CardWorkModel[] = [];
  idCardWork : number;
  cardEncontrado?: CardWorkModel;
  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private loginService:LoginService) {}

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

    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  irAgregar(){
    this.router.navigate(['./cardWorks/agregar']);
  }

  cargarCard(card: CardWorkModel){
    this.cardService.cargarCard(card);
  }

  eliminarCard(card: CardWorkModel){
    const eliminar = confirm('Estas seguro de eliminar?');
    if(eliminar){
      this.cardService.eliminarCardWork(card.idCardWork);
      let index = this.cardList.findIndex(index =>
      index.idCardWork == card.idCardWork);
      this.cardList.splice(index, 1);
      this.router.navigate(['admin/trabajos']);
    }
  }

}
