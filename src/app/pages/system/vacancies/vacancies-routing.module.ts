import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from './containers/vacancies/vacancies.component';
import { VacancyComponent } from './containers/vacancy/vacancy.component';

const routes: Routes = [
  {path: '', component: VacanciesComponent, pathMatch: 'full'},
  {path: ':id', component: VacancyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule {}

