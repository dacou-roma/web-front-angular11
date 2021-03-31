import {Component, OnInit} from '@angular/core';
import {ProjetsService} from "../../../services/projets.service";
import {Projet} from "../../models/projet.model";
import {Observable, of} from "rxjs";
import {AppDataState, typeState} from "../../state/projet.state";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  projets$:Observable<AppDataState<Projet[]>>| null=null;
  readonly type = typeState;
  constructor(private service: ProjetsService, private router:Router) { }

  ngOnInit(): void {

  }

  onGetAllProjets() {
    this.projets$ = this.service.getAllProjets().pipe(
      map(data=>({dataState:typeState.LOADED, data:data})),
      catchError(err => of({dataState:typeState.ERROR,errorMessage:err.message})),
      startWith({dataState:typeState.LOADING})
    );
  }
  onSearch(formData: any) {
    this.projets$ = this.service.searchProjets(formData.keyword).pipe(
      map(data=>({dataState:typeState.LOADED, data:data})),
      catchError(err => of({dataState:typeState.ERROR,errorMessage:err.message})),
      startWith({dataState:typeState.LOADING})
    );
  }
  onViewDetail(p: Projet) {
    this.router.navigateByUrl("/projet/"+p.id);
  }
  onNewProjet() {
    this.router.navigateByUrl('/newProjet')
  }

  onNewTache() {
    this.router.navigateByUrl('/newTache');
  }

  onEditProjet(p: Projet) {
    this.router.navigateByUrl('/editProjet/'+p.id);
  }
}
