import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/services/interview.service';
import { InterviewClient } from 'src/app/core/models/interview.model';

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

  constructor(private interviewService: InterviewService) {}

  ngOnInit() {
    this.interviewService
      .getInterviewsDates()
      .subscribe(dates => {
        this.interviewDates = dates;
      });
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
          this.interviews = null;
          this.isInterviewsLoaded = true;
        }
      }, 500);
    }
  }

  onAddInterview() {
    // TODO: open add interview popup
    console.log('add interview');
  }
}
