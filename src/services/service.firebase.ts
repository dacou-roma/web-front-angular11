import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Project, spot} from "../app/models/project.model";

@Injectable({providedIn:"root"})
export class ProjectServiceFirebase {

  //private projetctCollection: AngularFirestoreCollection<Projet>;

  private projectList: AngularFireList<Project>;
  private pathRef = '/projets';
  constructor(private readonly afs : AngularFirestore,public afdb: AngularFireDatabase) {
    //this.projetctCollection = afs.collection<Projet>('projets');
    this.projectList = afdb.list(this.pathRef);
  }

  getlistProject():AngularFireList<Project>{
    return this.projectList;
  }

  createProject(project:Project):void{
    this.projectList.push(project);
  }

  upDateProject(projectId:string, item:Project):Promise<void>{
   return  this.projectList.update(projectId,item);
  }

  deleteProject(projectId:string):Promise<void>{
    return  this.projectList.remove(projectId);
  }
  createTache(t:spot,project:Project):Promise<void>{
    project.taches.push(t);
    return this.upDateProject(project.id,project);
  }

}
