import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Project} from "../../models/project.model";
import {ServiceFirestore} from "../../../services/service.firestore";

@Component({
  selector: 'app-projet-add',
  templateUrl: './projet-add.component.html',
  styleUrls: ['./projet-add.component.css']
})
export class ProjetAddComponent implements OnInit {
  projetFormGroup?:FormGroup;
  submitted: boolean=false;
  constructor(private formBuilder:FormBuilder, private router:Router,private firesToreService:ServiceFirestore) { }

  ngOnInit(): void {
    this.projetFormGroup = this.formBuilder.group({
      titre:["", Validators.required],
      description:["",Validators.required],
      taches:[[]],
      temps:[0],
      keyword:[[]]
    });
  }
  onSaveProjet() {
    this.submitted = true;
    if(this.projetFormGroup?.invalid) return;
    const projectId = this.firesToreService.afs.createId();
    const keywords = this.firesToreService.generateKeyWords(this.projetFormGroup?.value.titre.toLowerCase());
    let project: Project = {
      id:projectId,
      titre: this.projetFormGroup?.value.titre,
      description: this.projetFormGroup?.value.description,
      taches: this.projetFormGroup?.value.taches,
      temps:this.projetFormGroup?.value.temps,
      keywords: keywords
    }
    this.firesToreService.saveProject(project,projectId);
    setTimeout(function (){
      alert('nouveau projet ajouté avec succès');
    },3000)
    this.router.navigate(['projets']);
  }

  onCancel() {
    this.router.navigate(['projets']);
  }
}
