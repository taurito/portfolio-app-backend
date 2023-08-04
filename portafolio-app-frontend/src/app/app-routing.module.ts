import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { WorksComponent } from './works/works.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './fileAdmin/administrador/administrador.component';
import { InfoGeneralComponent } from './fileAdmin/info-general/info-general.component';
import { TrabajosComponent } from './fileAdmin/trabajos/trabajos.component';

const routes: Routes = [
  /*{path:'', component: WorksComponent},
  {path: 'cardWorks', component: WorksComponent, children:[
    {path:'agregar', component: FormularioComponent},
    {path:':idCardWork', component: FormularioComponent}
  ]},
  {path: 'home', component: HomeComponent},
  {path:'sobreMi', component: SobreMiComponent},
  {path:'login', component:LoginComponent}*/

  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sobreMi', component: SobreMiComponent},
  {path: 'cardWorks', component: WorksComponent, children:[
    {path:'agregar', component: FormularioComponent},
    {path:':idCardWork', component: FormularioComponent}
  ]},
  {path:'admin', component:AdministradorComponent, children:[
    {path: 'general', component:InfoGeneralComponent},
    {path: 'trabajos', component:TrabajosComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
