import { CrisisService } from './../crisis.service';
import { Component, Input, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    private dialogService: DialogService
  ) {}


  ngOnInit() {
    this.route.data
      .subscribe((data: {crisis: Crisis}) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });

  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  cancel() {
    this.gotoCrises();
  }


  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    console.log(crisisId);
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }


  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }
}
