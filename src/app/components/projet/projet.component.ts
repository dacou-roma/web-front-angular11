import {Component, OnInit} from '@angular/core';
import {Projet, tache} from "../../models/projet.model";
import {ActivatedRoute} from "@angular/router";
import {ProjetsService} from "../../../services/projets.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projetId:number;
  currentProjet?:Projet;
  temps:number=0;
  currentTache?:tache;
  statusChrono:boolean=false;
  button_status:string='START';
  chrono_id:number=0;
  constructor(private activatedRoute: ActivatedRoute, private service:ProjetsService) {
    this.projetId = this.activatedRoute.snapshot.params.id;
  }
  ngOnInit(): void {
    this.service.getProjetById(this.projetId).subscribe(
      data=>{
        this.currentProjet = data;
      },
      error => {
        console.log(error.message);
      });

  }

  onStart(curr_tache:tache,currentProjet:Projet) {
      if(this.chrono_id != 0){
        clearInterval(this.chrono_id);
        this.chrono_id = 0;
        this.statusChrono = false;
        this.button_status = 'START';
        //mise à jour du temps global du projet
         //mise à jour de la base de données
       this.service.upDate(currentProjet).subscribe(data=>{
         this.currentProjet = data;
       },error => {
         console.log(error.message);
       });
    }else {
      this.statusChrono = true;
      this.button_status = 'STOP';
      this.chrono_id = setInterval(function (){
        curr_tache.duree = curr_tache.duree + 1000;
        currentProjet.temps = currentProjet.temps + 1000;
      },1000)
    }
  }
}
