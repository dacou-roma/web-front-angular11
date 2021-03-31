import { Component, OnInit } from '@angular/core';
import {Projet, tache} from "../../models/projet.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjetsService} from "../../../services/projets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tache-adding',
  templateUrl: './tache-adding.component.html',
  styleUrls: ['./tache-adding.component.css']
})
export class TacheAddingComponent implements OnInit {
  tache?: tache
  listProjet?: Projet[];
  formGroupTache?: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ProjetsService,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroupTache = this.formBuilder.group({
      intitule: ["", Validators.required],
      projet: [null, [Validators.required]],
      duree: [0]
    });
    this.service.getAllProjets().subscribe(
      data => {
        this.listProjet = data;
      },error => {
        alert(error.message);
      }
    );
  }

  onCreateTache() {
    this.service.getProjet(this.formGroupTache?.value.projet).subscribe(data=>{
      this.service.addTache({"intitule":this.formGroupTache?.value.intitule,"duree":this.formGroupTache?.value.duree},this.formGroupTache?.value.projet);
      this.service.upDate(this.formGroupTache?.value.projet).subscribe(data=>{
        alert("le projet"+ this.formGroupTache?.value.projet.titre+ "a été mis à jour avec succès!!!");
        this.router.navigateByUrl('/projets');
      },error => {
        alert(error.message);
      });
    })

  }

}
