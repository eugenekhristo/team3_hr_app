import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CandidatesComponent } from './containers/candidates/candidates.component';
import { CandiatesRoutingModule } from './candidates-routing.module';
import { CandidateComponent } from './containers/candidate/candidate.component';
import { ShortInfoComponent } from './presentationals/short-info/short-info.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    CandiatesRoutingModule
  ],
  declarations: [CandidatesComponent, CandidateComponent, ShortInfoComponent]
})
export class CandidatesModule { }
