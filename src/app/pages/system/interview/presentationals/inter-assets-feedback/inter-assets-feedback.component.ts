import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from 'src/app/core/models/feedback.model';
import { MatDialog } from '@angular/material';
import { ReadFeedbackDialogComponent } from './read-feedback-dialog/read-feedback-dialog.component';

@Component({
  selector: 'hr-inter-assets-feedback',
  templateUrl: './inter-assets-feedback.component.html',
  styleUrls: ['./inter-assets-feedback.component.scss']
})
export class InterAssetsFeedbackComponent implements OnInit {
  @Input() feedback: Feedback;
  isReading = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.feedback);
  }

  readFeedback() {
    this.dialog
      .open(ReadFeedbackDialogComponent, { data: this.feedback })
      .afterClosed()
      .subscribe(() => this.isReading = false);
  }

}
