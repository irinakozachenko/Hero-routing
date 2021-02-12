import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, ManageCrisesComponent, ManageHeroesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
  isLogged = false;

  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLogged = true)
    );
  }

  logout(): void {
    this.isLogged = false;
  }
}
