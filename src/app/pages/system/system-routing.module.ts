import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';
import { InterviewingComponent } from './interview/containers/interviewing/interviewing.component';

const routes: Routes = [
  {
    path: '',
    component: SystemShellComponent,
    children: [
      { path: 'interview', children: [
        {path: '', component: InterviewComponent, pathMatch: 'full'},
        {path: ':id', component: InterviewingComponent}
      ] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
