import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { InterviewingComponent } from './interview/containers/interviewing/interviewing.component';
import { VacancyListComponent } from './vacancy/containers/vacancy-list/vacancy-list.component';
import { VacancyViewComponent } from './vacancy/containers/vacancy-view/vacancy-view.component';
import { VacancyEditComponent } from './vacancy/containers/vacancy-edit/vacancy-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SystemShellComponent,
    children: [
      { path: 'interview', children: [
        {path: '', component: InterviewComponent, pathMatch: 'full'},
        {path: ':id', component: InterviewingComponent}
      ]},
      {path: 'candidates', loadChildren: './candidates/candidates.module#CandidatesModule'}
      
      { path: 'vacancies', component: VacancyListComponent },
      { path: 'vacancies', component: VacancyListComponent },
      { path: 'vacancies/:id', component: VacancyViewComponent },
      { path: 'vacancyView', component: VacancyViewComponent },
      { path: 'vacancyEdit', component: VacancyEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
