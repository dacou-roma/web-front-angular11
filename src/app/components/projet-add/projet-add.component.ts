import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjetsService} from "../../../services/projets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projet-add',
  templateUrl: './projet-add.component.html',
  styleUrls: ['./projet-add.component.css']
})
export class ProjetAddComponent implements OnInit {
  projetFormGroup?:FormGroup;
  submitted: boolean=false;
  constructor(private formBuilder:FormBuilder, private service:ProjetsService,private router:Router) { }

  ngOnInit(): void {
    this.projetFormGroup = this.formBuilder.group({
      titre:["", Validators.required],
      description:["",Validators.required],
      taches:[[]],
      temps:[0]
    });
  }
  onSaveProjet() {
    this.submitted = true;
    if(this.projetFormGroup?.invalid) return;
    this.service.save(this.projetFormGroup?.value).subscribe(
      data=>{
        alert("Nouveau projet" + this.projetFormGroup?.value.intitule + " ajouté avec suusces");
        this.router.navigateByUrl('/projets');
      },error => {
        alert(error.message);
      }
    );
  }
}
