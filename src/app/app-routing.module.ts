import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AproposComponent } from './apropos/apropos.component';


const routes: Routes = [
  {path:'acceuil',component:AcceuilComponent},
  {path:'',redirectTo:'acceuil',pathMatch:'full'},
  {path:'apropos',component:AproposComponent},
  {path:'**',redirectTo:'acceuil',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
