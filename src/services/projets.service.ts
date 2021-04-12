import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projet, tache} from "../app/models/projet.model";
import {environment} from "../environments/environment";
import {Project} from "../app/models/project.model";

@Injectable({providedIn:"root"})
export class ProjetsService{

  constructor(private http: HttpClient) {}
  //methode
  getAllProjets():Observable<Projet[]>{
    //simpler a error with Math.random
    let host = Math.random() > 0.1 ? environment.host : environment.unreachablehost ;
    return this.http.get<Projet[]>(host + "/projets")
  }
  getProjetById(id:number):Observable<Projet>{
    let host = environment.host;
    return this.http.get<Projet>(host+"/projets/"+id);
  }
  getProjet(projet:Projet):Observable<Projet>{
    //let host = Math.random() > 0.1 ? environment.host : environment.unreachablehost ;
    let host = environment.host;
    return this.http.get<Projet>(host + "/projets/" + projet.id);
  }
  searchProjets(keyword:string):Observable<Projet[]>{
    //simpler a error with Math.random
    //let host = Math.random() > 0.2 ? environment.unreachablehost : environment.host;
    let host = environment.host;
    return this.http.get<Projet[]>(host + "/projets?titre_like="+ keyword)
  }
  save(projet:Projet):Observable<Projet>{
    let host = environment.host;
    return this.http.post<Projet>(host+"/projets",projet);
  }
  addTache(tache:tache, projet:Projet){
    projet.taches.push(tache);
    projet.temps +=tache.duree;
  }
  upDate(projet:Project):Observable<Projet>{
    let host = environment.host;
    return this.http.put<Projet>(host+"/projets/" + projet.id, projet);
  }
}
