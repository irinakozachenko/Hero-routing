import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {

  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    console.log(4, route.data, route.data.preload, route.path);
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path);
      console.log('Preloaded:' + route.path);
      return load();
    }
    else {
      return of(null);
    }
  }
}
