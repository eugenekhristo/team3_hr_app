import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { SnackMessageComponent } from './components/snack-message/snack-message.component';
import { HrCalendarComponent } from './components/calendar/hr-calendar.component';

import { SnackMessagePbService } from './services/snack-message-pb.service';
import { SnackMessageService } from './services/snack-messgae.service';

@NgModule({
  declarations: [SnackMessageComponent, HrCalendarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [SnackMessagePbService, SnackMessageService],
  entryComponents: [SnackMessageComponent],
  exports: [MaterialModule, HrCalendarComponent]
})
export class UiModule {}
