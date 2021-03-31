export interface tache{
  intitule:string;
  duree:number;
}
export interface Projet{
  id:number;
  titre: string;
  description: string;
  taches: tache[];
  temps:number;
}
