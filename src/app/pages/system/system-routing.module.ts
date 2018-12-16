import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import {VacancyListComponent} from './vacancy/containers/vacancy-list/vacancy-list.component';
import {VacancyViewComponent} from './vacancy/containers/vacancy-view/vacancy-view.component';
import {VacancyEditComponent} from './vacancy/containers/vacancy-edit/vacancy-edit.component';


const routes: Routes = [
  {path: '', component: SystemShellComponent, children: [
    {path: 'interview', component: InterviewComponent},
      {path: 'vacancy', component: VacancyListComponent},
      {path: 'vacancyView', component: VacancyViewComponent},
      {path: 'vacancyEdit', component: VacancyEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
