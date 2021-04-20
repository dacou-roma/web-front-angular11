import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, typeEvent} from "../../../state/projet.state";
import {EventDriverService} from "../../../../services/eventDriver.service";

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {
  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProjets() {
    //this.projectEventEmiter.emit({type:typeEvent.GET_ALL_PROJECTS});
    this.eventDrivenService.publishEvent({type:typeEvent.GET_ALL_PROJECTS})
  }

  onNewProjet() {
    //this.projectEventEmiter.emit({type:typeEvent.NEW_PROJECT});
    this.eventDrivenService.publishEvent({type:typeEvent.NEW_PROJECT})
  }

  onNewTache() {
    //this.projectEventEmiter.emit({type:typeEvent.NEW_SPOT});
    this.eventDrivenService.publishEvent({type:typeEvent.NEW_SPOT})
  }

  recherche(value: any) {
    //this.projectEventEmiter.emit({type:typeEvent.SEARCH_PROJECTS,data:value});
    this.eventDrivenService.publishEvent({type:typeEvent.SEARCH_PROJECTS,data:value});
  }
}
