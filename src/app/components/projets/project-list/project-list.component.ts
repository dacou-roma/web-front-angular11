import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, typeState} from "../../../state/projet.state";
import {Project} from "../../../models/project.model";
import {EventDriverService} from "../../../../services/eventDriver.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() projectsInput$?:Observable<AppDataState<Project[]>>;
  readonly type = typeState;
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
  }
}
