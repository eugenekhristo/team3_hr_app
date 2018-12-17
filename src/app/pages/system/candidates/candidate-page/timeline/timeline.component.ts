import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewNotesDialogComponent} from './new-notes-dialog/new-notes-dialog.component';
import {NewExperienceDialogComponent} from './new-experience-dialog/new-experience-dialog.component';
import {NewCvDialogComponent} from './new-cv-dialog/new-cv-dialog.component';
import {Candidate} from '../../../../../core/models/candidate.model';
import {CandidateService} from '../../../../../core/services/candidate.service';
import {ActivatedRoute, Params} from '@angular/router';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';
import {InterviewClient} from '../../../../../core/models/interview.model';
import {InterviewService} from '../../../shared/services/interview.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


export interface CandidateNotes {
  Note: string;
  date: Date;
}

export interface CandidateExperience {
  companyName: string;
  dateFrom: Date;
  dateTo: Date;
  position: string;
  date: Date;
}

@Component({
  selector: 'hr-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  interviewSrc = 'https://pp.userapi.com/c846124/v846124033/13c9f6/ObzTSC3ZsW0.jpg';
  cvSrc = 'https://pp.userapi.com/c846124/v846124033/13c9fd/d0YzLGHlF1o.jpg';
  experienceSrc = 'https://pp.userapi.com/c846124/v846124033/13c9ef/8bOFWRFc1P8.jpg';
  notesSrc = 'https://pp.userapi.com/c846124/v846124033/13ca04/Az4jQeTtQqc.jpg';

  candidateInfo = [];
  notes: CandidateNotes[] = [];
  experiences: CandidateExperience[] = [];
  interviews = [];

  constructor(public dialog: MatDialog,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private snackMessage: SnackMessageService,
              private matConfirm: MatConfirmService,
              private interviewDialog: InterviewDialogService,
              private interviewService: InterviewService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this.interviewService.getInterviewsByCandidate(params['id']);
            }

            return of(null);
          }
        )
      )
      .subscribe(
        (interviews) => {
          if (interviews) {
            this.interviews = interviews;
            this.interviews.forEach(element2 => {
              const object = element2;
              object.type = 'Interview';
              object.date = new Date(object.date);
              object.curdate = new Date(object.curdate);
              this.candidateInfo.push(object);
            });
            console.log(this.candidateInfo);
            this.sortData();
          }

        }
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.candidate.notes) {
      this.candidate.notes.forEach(element => {
        element.type = 'Note';
        element.curdate = new Date(element.curdate);
        this.candidateInfo.push(element);
      });
    } else {
      this.candidate.notes = [];
    }
    if (this.candidate.experience) {
      this.candidate.experience.forEach(element => {
        element.type = 'Experience';
        element.curdate = new Date(element.curdate);
        element.dateFrom = new Date(element.dateFrom);
        element.dateTo = new Date(element.dateTo);
        this.candidateInfo.push(element);
      });
    } else {
      this.candidate.experience = [];
    }
    if (this.candidate.cv) {
      this.candidate.cv.forEach(element => {
        element.type = 'CV';
        element.curdate = new Date(element.curdate);
        this.candidateInfo.push(element);
      });
    } else {
      this.candidate.cv = [];
    }
    this.sortData();
  }

  addCv() {
    const dialogNew = this.dialog.open(NewCvDialogComponent, {
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.curdate = new Date();
        result.type = 'CV';
        this.candidateInfo.push(result);
        this.candidate.cv.push(result);
        this.sortData();
        this.saveToDb();
      }
    });
  }

  downloadCv(cv) {
    const a = document.createElement('a');
    a.download = cv.name;
    a.href = cv.data;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  }

  sortData() {
    this.candidateInfo.sort((n1, n2) => {
      return n2.curdate.getTime() - n1.curdate.getTime();
    });
  }

  addNotes() {
    const dialogNew = this.dialog.open(NewNotesDialogComponent, {
      data: {...this.notes}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.curdate = new Date();
        result.type = 'Note';
        this.candidateInfo.push(result);
        this.candidate.notes.push(result);
        this.sortData();
        this.saveToDb();
      }
    });
  }

  addInterview() {
    const dialogRef = this.interviewDialog.open(
      new InterviewClient(this.candidate, null, '', ''),
      INTERVIEW_DIALOG_TYPES.add
    );

    dialogRef.afterClosed().subscribe((interview: InterviewClient) => {
      if (interview) {
        this.interviewService
          .addInterview(interview)
          .subscribe((res: InterviewClient) => {
            this.interviewService.interviewAdded$.next({
              ...interview,
              id: res.id
            });
            this.snackMessage.openSnackBar(`An interview event is added!`);
          });
      }
    });
  }

  addExperience() {
    const dialogNew = this.dialog.open(NewExperienceDialogComponent, {
      data: {...this.experiences}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.curdate = new Date();
        result.type = 'Experience';
        this.candidateInfo.push(result);
        this.candidate.experience.push(result);
        this.sortData();
        this.saveToDb();
      }
    });
  }

  saveEdits(i: number, element) {
    if (element.type === 'Note') {
      this.candidateInfo[i] = element;
      const index = this.candidate.notes.indexOf(element);
      this.candidate.notes[index] = element;
    } else if (element.type === 'Experience') {
      this.candidateInfo[i] = element;
      const index = this.candidate.experience.indexOf(element);
      this.candidate.experience[index] = element;
    }
    this.saveToDb();
  }

  closeBlock(i: number, element: any) {
    this.matConfirm
      .open('Are you sure you want delete this block?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.candidateInfo.splice(i, 1);
          let index: number;
          if (element.type === 'Note') {
            index = this.candidate.notes.indexOf(element);
            this.candidate.notes.splice(index, 1);
          } else if (element.type === 'Experience') {
            index = this.candidate.experience.indexOf(element);
            this.candidate.experience.splice(index, 1);
          } else if (element.type === 'CV') {
            index = this.candidate.cv.indexOf(element);
            this.candidate.cv.splice(index, 1);
          } else if (element.type === 'Interview') {
            index = this.interviews.indexOf(element);
            this.interviews.splice(index, 1);
            this.deleteInterview(element.id);
            return;
          }
          this.saveToDb();
        }
      });
  }

  saveEditInterview(element: InterviewClient) {
    this.interviewService
      .updateInterview(element)
      .subscribe((res: any) => {
        if (res) {
          this.snackMessage.openSnackBar('Interviews was updated');
        }
      });
  }

  deleteInterview(id: number) {
    this.interviewService
      .deleteInterviewById(id)
      .subscribe((res: any) => {
        if (res) {
          this.snackMessage.openSnackBar('Interviews was deleted');
        }
      });
  }

  saveToDb() {
    this.candidateService
      .update(this.candidate)
      .subscribe((res: any) => {
        if (res) {
          this.snackMessage.openSnackBar('Candidate was updated');
        }
      });
  }

}
