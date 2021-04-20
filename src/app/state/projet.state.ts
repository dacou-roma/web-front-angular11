export enum typeEvent {
  GET_ALL_PROJECTS="[Project] Get all Project",
  NEW_PROJECT="[Project] New Project",
  SEARCH_PROJECTS="[Projects] search Projects",
  NEW_SPOT="[Spot] New Spot ",
  VIEW_DETAIL="[Project] détail Project",
  EDIT_PROJECT="[Project] edit Project",
  START_CHRONO="[Spot], start chrono",
  DYSPLAY_CHRONO="[Spot], dysplay chrono",
  CLOSED_CHRONO="[Spot], close chrono",
  STOP_CHRONO="[Spot], stop chrono"
}
export interface ActionEvent{
  type : typeEvent,
  data? : any,
  data1?:any,
  data2?:any
}
export enum typeState{
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T>{
  dataState?: typeState;
  data?: T;
  errorMessage?: string
}

export interface duree{

}
