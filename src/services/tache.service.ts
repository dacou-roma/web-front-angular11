import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({providedIn:'root'})
export class TacheService{
  constructor() {
  }
  start_stop_chrono(chrono_timer:number){
    return  chrono_timer+1;
    console.log(chrono_timer);
  }

}
