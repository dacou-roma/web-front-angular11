import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {AppDataState, typeState} from "../../state/projet.state";
import {catchError, map, startWith} from "rxjs/operators";
import {NavigationExtras, Router} from "@angular/router";
import {Project} from "../../models/project.model";
import {ServiceFirestore} from "../../../services/service.firestore";
import firebase from "firebase";
import firestore = firebase.firestore;


@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  customListProject: any;
  projects$?:Observable<AppDataState<Project[]>>;
  readonly type = typeState;
  asObservableProject?:Observable<Project[]>;
  listSearchSubject = new BehaviorSubject<Project[]>([]);
  list:Project[] = [];

  navigationExtras:NavigationExtras = {
    state:{
      value:null
    }
  };
  constructor(private fireStoreService:ServiceFirestore, private router:Router) {
  }

  ngOnInit(): void {
    this.asObservableProject = this.listSearchSubject.asObservable();
  }

  setListsearch(searchList:Project[]) {
    this.listSearchSubject.next(searchList);
  }
  onGetAllProjets() {
    this.projects$ = this.fireStoreService.projects?.pipe(
      map(data=>({dataState:typeState.LOADED, data:data})),
      catchError(err => of({dataState:typeState.ERROR,errorMessage:err.message})),
      startWith({dataState:typeState.LOADING})
    );
  }
  recherche(formData: any) {
    this.list = [];
    const query = firestore().collection('projets').where('keywords', 'array-contains',formData.keyword);
    query.get().then((querySnapshot)=>{
      querySnapshot.docs.map(data=>{
        this.list.push(data.data() as Project);
        this.setListsearch(this.list);
      })
      this.projects$ = this.asObservableProject?.pipe(
        map(data=>({dataState:typeState.LOADED,data:data})),
        startWith({dataState:typeState.LOADING}),
        catchError(()=>of({dataState:typeState.ERROR}))
      )
    })
  }
  onViewDetail(p: Project) {
    if (this.navigationExtras.state){
      this.navigationExtras.state.value = p;
    }
    this.router.navigate(['projet'],this.navigationExtras);

  }
  onNewProjet() {
    this.router.navigateByUrl('/newProjet')
  }

  onNewTache() {
    this.router.navigateByUrl('/newTache');
  }

  onEditProjet(p: Project) {
    if (this.navigationExtras.state){
      this.navigationExtras.state.value = p;
    }
    this.router.navigate(['editProjet'],this.navigationExtras);
  }
  /*
  //methode fireBase
    getCustomersListProject() {
      this.fireBaseService.getlistProject().snapshotChanges().pipe(
        map(changes =>changes.map(c => ({
              ...c.payload.val()
            })
          )
        )
      ).subscribe(data=>{
        this.customListProject = data;
      })
    }
   */
  /*
        //Methodes json server
  this.projets$ = this.service.getAllProjets().pipe(
    map(data=>({dataState:typeState.LOADED, data:data})),
    catchError(err => of({dataState:typeState.ERROR,errorMessage:err.message})),
    startWith({dataState:typeState.LOADING})
  );
   */
  /*
    onSearch(formData: any) {
      this.projets$ = this.service.searchProjets(formData.keyword).pipe(
        map(data=>({dataState:typeState.LOADED, data:data})),
        catchError(err => of({dataState:typeState.ERROR,errorMessage:err.message})),
        startWith({dataState:typeState.LOADING})
      );
    }

     */
}
