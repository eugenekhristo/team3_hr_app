import { Component, OnInit } from '@angular/core';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Candidate, TimelineNote } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { MatDialog } from '@angular/material';
import { AddNoteDialogComponent } from '../../presentationals/timeline-note/add-note-dialog/add-note-dialog.component';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/core/models/feedback.model';

@Component({
  selector: 'hr-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  constructor(
    public candidateStore: CandidatesStore,
    private matSnack: SnackMessageService,
    private matConfirm: MatConfirmService,
    private matDialog: MatDialog,
    private interviewDialog: InterviewDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.candidateStore.bootstrapCandidate(this.route.snapshot.params['id']);

    if (this.route.snapshot.queryParams['feedbackAdded']) {
      window.setTimeout(() => this.matSnack.openSnackBar('Feedback for the candidate is added 🤘'), 0);
    }
  }

  onCandidateChanged(candidate: Candidate): void {
    this.candidateStore
      .updateCandidate(candidate)
      .subscribe(() => this.matSnack.openSnackBar('Candidate is updated!'));
  }

  onDeleteNote(note: TimelineNote) {
    this.matConfirm
      .open('Are you sure you wanna delete this note?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.candidateStore
            .deleteNote(note)
            .subscribe(() =>
              this.matSnack.openSnackBar('The note was successfully deleted!')
            );
        }
      });
  }

  onAddNote() {
    const dialogRef = this.matDialog.open(AddNoteDialogComponent);
    dialogRef.afterClosed().subscribe(body => {
      if (body) {
        const note = new TimelineNote(body);
        this.candidateStore
          .addNote(note)
          .subscribe(() => this.matSnack.openSnackBar('The note was added!'));
      }
    });
  }

  onAddInterview(candidate: Candidate): void {
    const dialogRef = this.interviewDialog.open(
      new InterviewClient(candidate, null, '', ''),
      INTERVIEW_DIALOG_TYPES.add_timeline
    );

    dialogRef.afterClosed().subscribe(interview => {
      if (interview) {
        this.candidateStore
          .addInterview(interview)
          .subscribe(() =>
            this.matSnack.openSnackBar('The interview was added!')
          );
      }
    });
  }

  onChangeFeedback(feedback: Feedback): void {
    this.candidateStore
      .updateFeedback(feedback)
      .subscribe(() => this.matSnack.openSnackBar('Feedback is updated!'));
  }
}
