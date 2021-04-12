import {Component, OnInit} from '@angular/core';
import {tache} from "../../models/projet.model";
import {Router} from "@angular/router";
import {ProjetsService} from "../../../services/projets.service";
import {Project} from "../../models/project.model";
import {ServiceFirestore} from "../../../services/service.firestore";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  temps:number=0;
  currentTache?:tache;
  statusChrono:boolean=false;
  button_status:string='START';
  chrono_id:any;
  curr_project: Project;
  constructor(private fireStoreService:ServiceFirestore,private router:Router) {
    this.curr_project = this.router.getCurrentNavigation()?.extras.state?.value;
  }
  ngOnInit(): void {
  }

  onStart(curr_tache: tache, currentProjet: Project) {
      if(this.chrono_id != 0){
        clearInterval(this.chrono_id);
        this.chrono_id = 0;
        this.statusChrono = false;
        this.button_status = 'START';
       this.fireStoreService.saveProject(this.curr_project, this.curr_project.id).then((result)=>{
         this.curr_project = result;
       });
    }else {
      this.statusChrono = true;
      this.button_status = 'STOP';
      this.chrono_id = setInterval(function (){
        curr_tache.duree = curr_tache.duree + 1000;
        currentProjet.temps = currentProjet.temps + 1000;
      },1000);
    }
  }
}
