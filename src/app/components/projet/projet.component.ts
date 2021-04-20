import {Component, OnInit} from '@angular/core';
import {tache} from "../../models/projet.model";
import {Router} from "@angular/router";
import {Project, spot} from "../../models/project.model";
import {ServiceFirestore} from "../../../services/service.firestore";
import {ActionEvent, typeEvent} from "../../state/projet.state";
import {EventDriverService} from "../../../services/eventDriver.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  temps:number = 0;
  currentTache?:tache;
  curr_project: Project;
  statusSpot: boolean = false;
  constructor(private fireStoreService:ServiceFirestore,private router:Router,private eventDriverService:EventDriverService) {
    this.curr_project = this.router.getCurrentNavigation()?.extras.state?.value;
  }
  ngOnInit(): void {
    this.eventDriverService.eventObserver.subscribe(actionEvent=>{
      switch (actionEvent.type) {
        case typeEvent.START_CHRONO: this.statusSpot = true; break;
        case typeEvent.STOP_CHRONO:this.statusSpot = false;
      }
    })
  }
/*
  onStart(curr_tache: spot, currentProject: Project) {
      if(this.chrono_id != 0){
        clearInterval(this.chrono_id);
        this.chrono_id = 0;
        this.statusSpot = false;
        this.button_status = 'START';
        curr_tache.spotStatus = false;
       this.fireStoreService.saveProject(this.curr_project, this.curr_project.id).then((result)=>{
         this.curr_project = result as Project;
       });
      this.eventDriverService.publishEvent({type:typeEvent.CLOSED_CHRONO,data:this.curr_project,data1:this.currentTache});
    }else {
      this.button_status = 'STOP';
      this.statusSpot = true;
      curr_tache.spotStatus = true;
      this.chrono_id = setInterval(function (){
        curr_tache.duree = curr_tache.duree + 1000;
        currentProject.temps = currentProject.temps + 1000;
      },1000);
      this.eventDriverService.publishEvent({type:typeEvent.DYSPLAY_CHRONO,data:currentProject,data1:curr_tache});
    }
    console.log('valeur du chrono','=>',this.chrono_id);
  }

 */
/*
  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case typeEvent.START_CHRONO:
        {
          this.onStart($event.data,$event.data1);
        }break;
    }
  }

 */

}
