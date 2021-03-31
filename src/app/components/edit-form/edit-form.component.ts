import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ProjetsService} from "../../../services/projets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Projet} from "../../models/projet.model";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
editFormGroup?:FormGroup;
currentProjet?:Projet;
  constructor(private service: ProjetsService,private formBuilder:FormBuilder, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.service.getProjetById(this.route.snapshot.params.id).subscribe(data=>{
      this.currentProjet = data;
      this.editFormGroup = this.formBuilder.group({
        id:[this.currentProjet.id],
        titre:[this.currentProjet?.titre],
        description:[this.currentProjet?.description],
        taches:[this.currentProjet?.taches],
        temps:[this.currentProjet?.temps]
      });
    });

  }
  onEdit() {
    if(this.editFormGroup?.invalid) return;
    let p = {
      "id":this.editFormGroup?.value.id,
      "titre":this.editFormGroup?.value.titre,
      "description":this.editFormGroup?.value.description,
      "taches":this.editFormGroup?.value.taches,
      "temps":this.editFormGroup?.value.temps
    }
    this.service.upDate(p).subscribe(data=>{
      alert(' le projet ' + this.editFormGroup?.value.titre + ' mmis a jour avec succès');
      this.router.navigateByUrl('/projets');
    },error => {
      alert(error.message);
    });
  }
}
