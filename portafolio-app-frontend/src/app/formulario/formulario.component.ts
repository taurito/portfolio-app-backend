import { CardWorkModel } from './../card-work.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from './../card-service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  idCardWork: number;
  tituloInput: string;
  DesTextAreA: string;
  RefInput: string;

  public archivoCapturado: any;
  public previsualizacion: string;

  constructor(private cardService: CardService, private router: Router, private rout:ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  capturarFile(event: any){
    this.archivoCapturado = event.target.files[0];
    this.extraerBase64(this.archivoCapturado).then((imagenDeco: any) =>{
      this.previsualizacion = imagenDeco.base;
      console.log(imagenDeco);
      console.log(this.archivoCapturado);
      //console.log(imagenDeco.base);

    })
    //this.archivos.push(archivoCapturado);
    //console.log(event.target.files);
  }

  onGuardarPersona(){
    const cardGuardar = new CardWorkModel(this.idCardWork, this.tituloInput, this.previsualizacion ,this.DesTextAreA, this.RefInput);
    this.cardService.agregarCardWork(cardGuardar);
    this.router.navigate(['cardWorks']);
    console.log(cardGuardar);
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
