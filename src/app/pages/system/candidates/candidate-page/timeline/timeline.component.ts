import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewNotesDialogComponent} from './new-notes-dialog/new-notes-dialog.component';
import {NewExperienceDialogComponent} from './new-experience-dialog/new-experience-dialog.component';
import {NewCvDialogComponent} from './new-cv-dialog/new-cv-dialog.component';
import {Candidate} from '../../../../../core/models/candidate.model';
import {CandidateService} from '../../../../../core/services/candidate.service';
import {ActivatedRoute} from '@angular/router';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';



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

  constructor(public dialog: MatDialog,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private snackMessage: SnackMessageService,
              private matConfirm: MatConfirmService,
  ) {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.candidate.notes) {
      this.candidate.notes.forEach(element => {
        element.type = 'Note';
        element.date = new Date(element.date);
        this.candidateInfo.push(element);
      });
    } else {
      this.candidate.notes = [];
    }
    if (this.candidate.experience) {
      this.candidate.experience.forEach(element => {
        element.type = 'Experience';
        element.date = new Date(element.date);
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
        element.date = new Date(element.date);
        this.candidateInfo.push(element);
      });
    } else {
      this.candidate.cv = [];
    }
    console.log(this.candidateInfo);
    this.sortData();
  }

  addCv() {
    const dialogNew = this.dialog.open(NewCvDialogComponent, {
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
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
      return n2.date.getTime() - n1.date.getTime();
    });
  }

  addNotes() {
    const dialogNew = this.dialog.open(NewNotesDialogComponent, {
      data: {...this.notes}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
        result.type = 'Note';
        this.candidateInfo.push(result);
        this.candidate.notes.push(result);
        this.sortData();
        this.saveToDb();
      }
    });
  }

  addInterview() {

  }

  addExperience() {
    const dialogNew = this.dialog.open(NewExperienceDialogComponent, {
      data: {...this.experiences}
    });

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        result.date = new Date();
        result.type = 'Experience';
        this.candidateInfo.push(result);
        this.candidate.experience.push(result);
        this.sortData();
        this.saveToDb();
      }
    });
  }

  saveNotes(i: number, element) {
    this.candidateInfo[i] = element;
    const index = this.candidate.notes.indexOf(element);
    this.candidate.notes[index] = element;
    this.saveToDb();
  }

  saveExperience(i: number, element) {
    this.candidateInfo[i] = element;
    const index = this.candidate.experience.indexOf(element);
    this.candidate.experience[index] = element;
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
          }
          this.saveToDb();
        }
      });
  }

  saveToDb() {
    this.candidateService
      .update(this.candidate)
      .subscribe((res: any) => {
        this.snackMessage.openSnackBar('Candidate was updated');
        console.log(res);
      });
  }

}
