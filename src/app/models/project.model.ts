export interface spot{
  id:string;
  intitule:string;
  duree:number;
  spotStatus:boolean;
}
export interface Project{
  id:string;
  titre: string;
  description: string;
  taches: spot[];
  temps:number;
  keywords?:string[];
}
