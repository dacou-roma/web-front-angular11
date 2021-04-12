import { Component, OnInit } from '@angular/core';
import {tache} from "../../models/projet.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServiceFirestore} from "../../../services/service.firestore";
import {Project} from "../../models/project.model";

@Component({
  selector: 'app-tache-adding',
  templateUrl: './tache-adding.component.html',
  styleUrls: ['./tache-adding.component.css']
})
export class TacheAddingComponent implements OnInit {
  tache?: tache
  listProject?: Project[];
  formGroupTache?: FormGroup;

  constructor(private fireStoreService:ServiceFirestore,private formBuilder: FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroupTache = this.formBuilder.group({
      intitule: ["", Validators.required],
      project: [null, [Validators.required]],
      duree: [0]
    });
    this.fireStoreService.projects?.subscribe(data=>{
      this.listProject = data;
    });
  }
  addTache(){
    let tacheId = this.fireStoreService.afs.createId();
    const t = {"id":tacheId,"intitule":this.formGroupTache?.value.intitule,"duree":this.formGroupTache?.value.duree};

    this.fireStoreService.createTeaches(t,this.formGroupTache?.value.project).then(project=>{
      alert('nouvelle tache: ' + ' ' + project + 'ajouté avec succès!!!');
      this.router.navigateByUrl('/projets');
    });
  }
}
