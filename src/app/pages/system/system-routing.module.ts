import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemShellComponent } from './system-shell/system-shell.component';
import { InterviewComponent } from './interview/containers/interview/interview.component';


const routes: Routes = [
  {path: '', component: SystemShellComponent, children: [
    {path: 'interview', component: InterviewComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
