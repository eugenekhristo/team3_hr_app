import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'hr-new-experience-dialog',
  templateUrl: './new-experience-dialog.component.html',
  styleUrls: ['./new-experience-dialog.component.scss']
})
export class NewExperienceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
