import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetAddComponent } from './components/projet-add/projet-add.component';
import { FooterComponent } from './components/footer/footer.component';
import { TacheAddingComponent } from './components/tache-adding/tache-adding.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjetsComponent,
    HomeComponent,
    ProjetComponent,
    ProjetAddComponent,
    FooterComponent,
    TacheAddingComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
