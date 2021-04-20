import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../../models/project.model";
import {typeEvent} from "../../../../state/projet.state";
import {EventDriverService} from "../../../../../services/eventDriver.service";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() projectItem?:Project;
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }

  onViewDetail(projectItem: Project) {
    this.eventDriverService.publishEvent({type:typeEvent.VIEW_DETAIL,data:projectItem})
  }

  onEditProjet(projectItem: Project) {
    this.eventDriverService.publishEvent({type:typeEvent.EDIT_PROJECT,data:projectItem});
  }
}
