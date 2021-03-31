import { Component, OnInit } from '@angular/core';
import {ProjetsService} from "../../../services/projets.service";
import {Projet} from "../../models/projet.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private list: Projet[] | null = null;
  constructor(private service: ProjetsService) { }

  ngOnInit(): void {
  }


}
