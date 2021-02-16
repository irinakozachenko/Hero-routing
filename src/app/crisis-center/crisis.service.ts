import { MessageService } from './../heroes/message.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Crisis } from './crisis';
import { CRISES } from './mock-crisis';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {

  static nextCrisisId = 100;
  private crisis$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

  constructor (private messageService: MessageService) {};

  getCrisises() { return this.crisis$};

  getCrisis(id: number | string) {
    return this.getCrisises().pipe(
      map(crisis =>
        crisis.find(crisis => crisis.id == +id)
      )
    );
  }

  /*addCrisis(name: string) {
    name = name.trim();
    if (name) {
      const crisis = {
        id: CrisisService.nextCrisisId++,
        name: name
      };
      CRISES.push(crisis);
      this.crisis$.next(CRISES)
    }
  }

  saveCrisis(crisis: Crisis) {
    if (crisis) {
      var c = CRISES.find(x => x.id === crisis.id);
      c.name = crisis.name;
      this.crisis$.next(CRISES)
    }
  }*/
}
