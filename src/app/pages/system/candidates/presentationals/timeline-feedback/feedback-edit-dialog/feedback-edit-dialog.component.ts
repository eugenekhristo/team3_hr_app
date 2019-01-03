import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Feedback } from 'src/app/core/models/feedback.model';

@Component({
  selector: 'hr-feedback-edit-dialog',
  templateUrl: './feedback-edit-dialog.component.html',
  styleUrls: ['./feedback-edit-dialog.component.scss']
})
export class FeedbackEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Feedback) { }

  ngOnInit() {
  }

}
