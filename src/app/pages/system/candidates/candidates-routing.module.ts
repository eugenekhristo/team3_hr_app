import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidatesComponent } from './containers/candidates/candidates.component';
import { CandidateComponent } from './containers/candidate/candidate.component';


const routes: Routes = [
  {path: '', component: CandidatesComponent, pathMatch: 'full'},
  {path: ':id', component: CandidateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandiatesRoutingModule {}

