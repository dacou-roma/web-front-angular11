import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjetsComponent} from "./components/projets/projets.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjetComponent} from "./components/projet/projet.component";
import {ProjetAddComponent} from "./components/projet-add/projet-add.component";
import {TacheAddingComponent} from "./components/tache-adding/tache-adding.component";
import {EditFormComponent} from "./components/edit-form/edit-form.component";

const routes: Routes = [
  {path:"projets", component:ProjetsComponent},
  {path:"accueil", component:HomeComponent},
  {path:"projet/:id",component:ProjetComponent},
  {path:"editProjet/:id",component:EditFormComponent},
  {path:"newTache",component:TacheAddingComponent},
  {path:"newProjet",component:ProjetAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
