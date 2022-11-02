import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {DetailsPageComponent} from "./components/details-page/details-page.component";

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'details/:id', component: DetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
