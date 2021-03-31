
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
