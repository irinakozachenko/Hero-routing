import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  selectedId: number;

  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getHeroes();
  }


  getHeroes(): void {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      })
    );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/




