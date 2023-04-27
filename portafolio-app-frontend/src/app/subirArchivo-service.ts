import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubirArchivoService {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  baseApiUrl = "src/assets/img";

  subirImagen(file: File): any {
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.httpClient.post(this.baseApiUrl, formData).subscribe({
      next: response => console.log('Resultado de guardar una imagen:' + response),
      error: error => console.log('Error de guardar una imagen' + error)
    });
  }
}
