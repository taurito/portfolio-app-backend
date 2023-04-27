import { SubirArchivoService } from './../subirArchivo-service';
import { CardWorkModel } from './../card-work.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from './../card-service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  idCardWork: number;
  tituloInput: String;
  imageInput: String;
  DesTextAreA: String;
  RefInput: String;

  public file: File;
  public previsualizacion: string;


  constructor(private cardService: CardService,
              private router: Router,
              private route:ActivatedRoute,
              private sanitizer: DomSanitizer,
              private subirArchivoService: SubirArchivoService) {
              }

  ngOnInit(): void {
    this.idCardWork = this.route.snapshot.params['idCardWork'];
    if(this.idCardWork != null){
      const card = this.cardService.encontrarCardWork(this.idCardWork);
      if(card != null){
        this.tituloInput = card.titulo;
        this.imageInput = card.image;
        this.DesTextAreA = card.descripcion;
        this.RefInput = card.referencia;
        console.log("card encontrado:" + this.imageInput);
      }
    }
  }
  capturarFile(event: any){
    this.file = event.target.files[0];
    this.extraerBase64(this.file).then((imagenDeco: any) =>{
      this.previsualizacion = imagenDeco.base;
      this.imageInput = this.file.name;
      console.log(this.file.name);

    })
  }

  onGuardarWork(){
    //this.subirArchivoService.subirImagen(this.file);
    const cardGuardar = new CardWorkModel(this.idCardWork, this.tituloInput, this.imageInput ,this.DesTextAreA, this.RefInput);
    if(this.idCardWork != null){
      this.cardService.modificarCardWork(this.idCardWork, cardGuardar);
    }
    else{
      this.cardService.agregarCardWork(cardGuardar);
    }
    this.router.navigate(['cardWorks']);
  }

  cerrarFormulario(){
    this.router.navigate(['cardWorks']);
  }

  extraerBase64 = async ($event:any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return console.log(e);
    }
  })
}
