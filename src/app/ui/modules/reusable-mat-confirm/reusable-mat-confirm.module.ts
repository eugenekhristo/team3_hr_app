import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { MatConfirmService } from './mat-confirm-service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [DialogComponent],
  providers: [MatConfirmService],
  entryComponents: [DialogComponent]
})
export class ReusableMatConfirmModule {

}
