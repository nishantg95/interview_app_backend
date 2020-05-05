import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Question } from './interfaces/question';
import { filter, map } from 'rxjs/operators';
import { EventData } from './interfaces/event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject$ = new Subject();

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter( (event: EventData) => event.name === eventName),
      map( (event: EventData) => event["value"])).subscribe(action);
  }

}