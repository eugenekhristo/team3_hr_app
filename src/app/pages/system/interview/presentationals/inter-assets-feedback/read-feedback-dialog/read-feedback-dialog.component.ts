import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Feedback } from 'src/app/core/models/feedback.model';

@Component({
  selector: 'hr-read-feedback-dialog',
  templateUrl: './read-feedback-dialog.component.html',
  styleUrls: ['./read-feedback-dialog.component.scss']
})
export class ReadFeedbackDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Feedback) { }

  ngOnInit() {
  }

}
