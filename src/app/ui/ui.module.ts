import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { SnackMessageComponent } from './components/snack-message/snack-message.component';
import { SnackMessagePbService } from './services/snack-message-pb.service';
import { SnackMessageService } from './services/snack-messgae.service';


@NgModule({
  declarations: [SnackMessageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [SnackMessagePbService, SnackMessageService],
  entryComponents: [SnackMessageComponent],
  exports: [MaterialModule]
})
export class UiModule {}
