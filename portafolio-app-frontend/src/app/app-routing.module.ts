import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  {path: '', component: WorksComponent},
  {path: 'cardWorks', component: WorksComponent, children:[
    {path:'agregar', component: FormularioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
