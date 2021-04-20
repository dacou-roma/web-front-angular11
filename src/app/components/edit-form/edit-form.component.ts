import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ProjetsService} from "../../../services/projets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Projet} from "../../models/projet.model";
import {ServiceFirestore} from "../../../services/service.firestore";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
editFormGroup?:FormGroup;
currentProjet:Projet;
  constructor(private fireStoreService: ServiceFirestore,private formBuilder:FormBuilder, private route:ActivatedRoute,private router:Router) {
    this.currentProjet =this.router.getCurrentNavigation()?.extras?.state?.value;
  }

  ngOnInit(): void {
    this.editFormGroup = this.formBuilder.group({
      id:[this.currentProjet?.id],
      titre:[this.currentProjet?.titre],
      description:[this.currentProjet?.description],
      taches:[this.currentProjet?.taches],
      temps:[this.currentProjet?.temps]
    });
  }
  onEdit() {
    if(this.editFormGroup?.invalid) return;
    const keywords = this.fireStoreService.generateKeyWords(this.editFormGroup?.value.titre.toLowerCase());
    let p = {
      "id":this.editFormGroup?.value.id,
      "titre":this.editFormGroup?.value.titre,
      "description":this.editFormGroup?.value.description,
      "taches":this.editFormGroup?.value.taches,
      "temps":this.editFormGroup?.value.temps,
      "keywords": this.editFormGroup?.value.keywords ? this.editFormGroup?.value.keywords : keywords
    }
    this.fireStoreService.saveProject(p,p.id).then(data=>{
      setTimeout(function (){
        alert(' le projet ' + data.titre + ' mmis à jour avec succès');
      },3000)
      this.router.navigate(['projets']);
    },error=>{
      alert(error.message);
    });
  }
  onCancel() {
    this.router.navigate(['projets']);
  }
}
