import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project, spot} from "../../models/project.model";
import {ServiceFirestore} from "../../../services/service.firestore";
import {ActionEvent, typeEvent} from "../../state/projet.state";
import {EventDriverService} from "../../../services/eventDriver.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title: any = 'HELLO WORLD';
  @Input() curr_project?:Project;
  targetProject?:Project
  targetSpot?:spot;
  statusChrono : boolean = false;
  constructor(private service: ServiceFirestore,private eventDriverService:EventDriverService) {}

  ngOnInit(): void {
    this.eventDriverService.eventObserver.subscribe((actionEvent)=>{
      switch (actionEvent.type) {
        case typeEvent.CLOSED_CHRONO:{
          this.statusChrono = false;
        };break;
        case typeEvent.DYSPLAY_CHRONO:{
          this.targetProject = actionEvent.data as Project;
          this.targetSpot = actionEvent.data1 as spot;
          this.statusChrono = true;
        };break;
      }
    })
  };

}
