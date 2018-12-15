import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/services/interview.service';
import {
  InterviewClient,
  Interview
} from 'src/app/core/models/interview.model';
import { MatDialog } from '@angular/material';
import { AddInterviewDialogComponent } from '../add-interview-dialog/add-interview-dialog.component';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';

@Component({
  selector: 'hr-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  interviewDates: string[] = [];
  interviews: InterviewClient[] = [];
  isInterviewsLoaded = false;
  activeDate: string;
  // this variable to fix bug of the first loading of the calendar. If from service no response within 500 ms
  // then specify manually that there are no interviews for today
  firstLoadingResolved = false;

  constructor(
    private interviewService: InterviewService,
    private matDialog: MatDialog,
    private snackMessage: SnackMessageService,
    private matConfirm: MatConfirmService
  ) {}

  ngOnInit() {
    this.interviewService.getInterviewsDates().subscribe(dates => {
      this.interviewDates = dates;
    });

    this.interviewService.interviewAdded$.subscribe(
      (interview: InterviewClient) => {
        this.interviewDates = [...this.interviewDates, interview.date];
      }
    );

    this.interviewService.interviewAdded$.subscribe(
      (interview: InterviewClient) => {
        if (this.interviews) {
          this.interviews = [...this.interviews, interview].sort((a, b) =>
            a.time > b.time ? 1 : -1
          );
        }
      }
    );
  }

  onDatePicked(date: string) {
    this.activeDate = date;
    this.isInterviewsLoaded = false;
    this.interviewService.getInterviewsByDate(date).subscribe(res => {
      this.firstLoadingResolved = true;
      this.interviews = res;
      this.isInterviewsLoaded = true;
    });

    if (!this.firstLoadingResolved) {
      setTimeout(() => {
        if (!this.firstLoadingResolved) {
          this.interviews = [];
          this.isInterviewsLoaded = true;
        }
      }, 500);
    }
  }

  onAddInterview() {
    const dialogRef = this.matDialog.open(AddInterviewDialogComponent);

    dialogRef.afterClosed().subscribe((interview: InterviewClient) => {
      if (interview) {
        this.interviewService
          .addInterview(interview)
          .subscribe((res: InterviewClient) => {
            this.interviewService.interviewAdded$.next({...interview, id: res.id});
            this.snackMessage.openSnackBar(
              `An interview event is added!`
            );
          });
      }
    });
  }

  onDeleteInterview(interview: InterviewClient) {
    console.log(interview);
    this.matConfirm
      .open('Are you sure you wanna delete the interview event?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.interviewService.deleteInterviewById(interview.id).subscribe(() => {
            this.snackMessage.openSnackBar('The interview event is successfully deleted!');
            this.interviews = this.interviews.filter(
              _interview => _interview.id !== interview.id
            );
            // TODO: if no interviews left for today - delete appropriate date from interviewDates[]
            if (this.interviews.length === 0) {
              this.interviewDates = this.interviewDates.filter(date => interview.date !== date);
              this.interviewService.interviewDates = this.interviewDates;
            }
          });
        }
      });
  }

}
