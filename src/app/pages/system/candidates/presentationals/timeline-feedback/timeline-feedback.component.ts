import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feedback } from 'src/app/core/models/feedback.model';
import { MatDialog } from '@angular/material';
import { FeedbackEditDialogComponent } from './feedback-edit-dialog/feedback-edit-dialog.component';

@Component({
  selector: 'hr-timeline-feedback',
  templateUrl: './timeline-feedback.component.html',
  styleUrls: ['./timeline-feedback.component.scss']
})
export class TimelineFeedbackComponent implements OnInit {
  @Input() feedback: Feedback;
  @Output() feedbackChanged = new EventEmitter<Feedback>();

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {}

  onOpenDialog() {
    const dialogRef = this.matDialog.open(FeedbackEditDialogComponent, {
      data: this.feedback
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.feedbackChanged.emit({
          ...res,
          timestamp: this.feedback.timestamp,
          type: this.feedback.type
        });
      }
    });
  }
}
