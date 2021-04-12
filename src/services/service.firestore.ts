import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Project, spot} from "../app/models/project.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";


@Injectable({providedIn:"root"})
export class ServiceFirestore{
  projects?:Observable<Project[]>;
  private dataCollection:AngularFirestoreCollection<Project>;
  pathCollection = 'projets';

  constructor(readonly afs:AngularFirestore) {
    this.dataCollection = this.afs.collection<Project>(this.pathCollection);
    this.getlistProject();
  }

  private getlistProject(){
    this.projects = this.dataCollection.snapshotChanges().pipe(
      map(actions=>actions.map(c=>c.payload.doc.data() as Project))
    );
  }
  saveProject(project:Project,projectId:string):Promise<Project>{
    return new Promise(async (resolve,reject)=>{
      try {
        const id = projectId || this.afs.createId();
        const data = { ...project};
        return await this.dataCollection.doc(id).set(data);
      }catch (err){
        reject(err.message);
      }
    });
  }
  deleteProject(projectId:string):Promise<void>{
    return new Promise(async (resolve,reject)=>{
      try {
        const result = await this.dataCollection.doc(projectId).delete();
        resolve(result);
      }catch (err) {
        reject(err.message);
      }
    });
  }
  createTeaches(t:spot, project:Project):Promise<void>{
    return new Promise(async (resolve,reject)=>{
      try{
        project.taches.push(t);
        await this.saveProject(project, project.id);
      }catch (err) {
        reject(err.message);
      }
    });
  }
   createKeyWord(titre:any){
     const arrayTitre:string[] = [];
    let currTitre = '';
    titre.split('').forEach((letter:any)=>{
      currTitre += letter;
      arrayTitre.push(currTitre);
    });
    return arrayTitre;
  };
  generateKeyWords(titres:string){
    let keywordFullName:string[] = [];
    keywordFullName.push('');
    this.createKeyWord(titres).forEach(strg=>{
      keywordFullName.push(strg);
    });
    return keywordFullName;
  }
}
