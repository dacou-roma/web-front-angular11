import {Component, Input, OnInit} from '@angular/core';
import {Project, spot} from "../../../models/project.model";
import {typeEvent} from "../../../state/projet.state";
import {EventDriverService} from "../../../../services/eventDriver.service";
import {ServiceFirestore} from "../../../../services/service.firestore";

@Component({
  selector: 'app-project-spot',
  templateUrl: './project-spot.component.html',
  styleUrls: ['./project-spot.component.css']
})
export class ProjectSpotComponent implements OnInit {
@Input() spotInput?:spot;
@Input() projectInput?:Project;
   button_status: string = 'START';
   id:number = 0;
  constructor(private eventDriverService:EventDriverService, private fireStoreService:ServiceFirestore) { }

  ngOnInit(): void {
  }
  onStart(spotInput: spot, projectInput: Project) {
    if (this.id!=0){
      clearInterval(this.id);
      this.id=0;
      this.button_status = 'START';
      spotInput.spotStatus = false
      this.fireStoreService.saveProject(projectInput, projectInput.id).then((result)=>{
        projectInput = result;
      });
      this.eventDriverService.publishEvent({type:typeEvent.STOP_CHRONO})
      this.eventDriverService.publishEvent({type:typeEvent.CLOSED_CHRONO,data:projectInput,data1:spotInput});
    }else {
      spotInput.spotStatus = true;
      this.button_status = 'STOP';
      this.id = setInterval(function (){
        spotInput.duree = spotInput.duree + 1000;
        projectInput.temps = projectInput.temps + 1000;
      },1000);
      this.eventDriverService.publishEvent({type:typeEvent.START_CHRONO});
      this.eventDriverService.publishEvent({type:typeEvent.DYSPLAY_CHRONO,data:projectInput,data1:spotInput});
    }

  }
  /*
  start(spot:spot,project:Project){
    this.button_status = 'STOP';
    spot.spotStatus = true;
    this.id = setInterval(function (){
      spot.duree = spot.duree + 1000;
      project.temps = project.temps + 1000;
    },1000);
    this.eventDriverService.publishEvent({type:typeEvent.DYSPLAY_CHRONO,data:project,data1:spot});
  }
  stop(spot:spot, project:Project){
    clearInterval(this.id);
    this.button_status = 'START';
    spot.spotStatus = false;
    this.fireStoreService.saveProject(project, project.id).then((result)=>{
      project = result;
    });
    this.eventDriverService.publishEvent({type:typeEvent.CLOSED_CHRONO,data:project,data1:spot});
  }

   */

}
