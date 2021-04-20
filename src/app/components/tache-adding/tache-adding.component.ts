import { Component, OnInit } from '@angular/core';
import {tache} from "../../models/projet.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServiceFirestore} from "../../../services/service.firestore";
import {Project, spot} from "../../models/project.model";

@Component({
  selector: 'app-tache-adding',
  templateUrl: './tache-adding.component.html',
  styleUrls: ['./tache-adding.component.css']
})
export class TacheAddingComponent implements OnInit {
  tache?: tache
  listProject?: Project[];
  formGroupTache?: FormGroup;
  projectSaved?:any;
  constructor(private fireStoreService:ServiceFirestore,private formBuilder: FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroupTache = this.formBuilder.group({
      intitule: ["", Validators.required],
      project: [null, [Validators.required]],
      spotStatus:[false],
      duree: [0]
    });
    this.fireStoreService.projects?.subscribe(data=>{
      this.listProject = data;
    });
  }
  addTache(){
    let tacheId = this.fireStoreService.afs.createId();
    const t = {
      "id":tacheId,
      "intitule":this.formGroupTache?.value.intitule,
      "spotStatus":false,
      "duree":this.formGroupTache?.value.duree
    };
    this.fireStoreService.createTeaches(t,this.formGroupTache?.value.project).then(tache=>{
     this.projectSaved = tache;
    });
    setTimeout(function (){
      alert('nouvelle tache  ajouté avec succès!!!');
    },2000)
    this.router.navigate(['projets']);
  }

  onCancel() {
    this.router.navigate(['projets']);
  }
}
