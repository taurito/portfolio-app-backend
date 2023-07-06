import { SubirArchivoService } from './subirArchivo-service';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorksComponent } from './works/works.component';

import { DataService } from './data-service';
import { CardService } from './card-service';

import { FormularioComponent } from './formulario/formulario.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksComponent,
    FormularioComponent,
    HomeComponent,
    HeaderComponent,
    SobreMiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService, CardService, SubirArchivoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
