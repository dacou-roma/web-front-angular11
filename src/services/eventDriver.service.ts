import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "../app/state/projet.state";

@Injectable({providedIn:'root'})
export class EventDriverService{
  eventSubject:Subject<ActionEvent> = new Subject<ActionEvent>();
  eventObserver = this.eventSubject.asObservable();

  publishEvent(event:ActionEvent){
    this.eventSubject.next(event);
  }
}
