import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';
import { InterviewService } from '../../../shared/services/interview.service';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hr-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  interviews: object[] = [];
  selectedDate: string;

  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  constructor(
    private interviewDialog: InterviewDialogService,
    private interviewService: InterviewService,
    private matSnack: SnackMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setCalendarOptions();
    this.interviewService.getAllInterviews().subscribe(interviews => {
      this.interviews = interviews;
      this.calendarOptions.events = this.interviews;
    });

    this.route.queryParams.subscribe(params => {
      if (params['event']) {
        switch (params['event']) {
          case 'interviewDeleted':
            window.setTimeout(
              () =>
                this.matSnack.openSnackBar(
                  'The interview event was successfully deleted!'
                ),
              0
            );
            break;
        }
      }
    });
  }

  private setCalendarOptions() {
    this.calendarOptions = {
      minTime: '07:00:00',
      maxTime: '20:00:00',
      timezone: 'local',
      buttonText: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List',
        today: 'Today'
      },
      header: {
        left: 'today',
        right: 'month,agendaWeek,agendaDay,list',
        center: 'prev, title, next'
      },
      firstDay: 1,
      height: 'parent',
      weekends: false,
      eventLimit: true,
      events: [],

      editable: true
    };
  }

  setSelectedDate(e: CustomEvent) {
    this.selectedDate = moment(e.detail.date._d).format('YYYY-MM-DD') as string;
  }

  openAddInterviewDialog() {
    const dialogRef = this.interviewDialog.open(
      new InterviewClient(null, null, this.selectedDate, this.selectedDate),
      INTERVIEW_DIALOG_TYPES.add
    );

    dialogRef.afterClosed().subscribe(interview => {
      if (interview) {
        this.interviewService.addInterview(interview).subscribe(res => {
          this.matSnack.openSnackBar('Interview event is added');
          this.renderInterviewEvent({ ...interview, id: res.id });
        });
      }
    });
  }

  onEventClick(e: CustomEvent) {
    const interviewId = e.detail.event.id;
    this.router.navigate([interviewId], { relativeTo: this.route });
  }

  onChangeDateTime(e: CustomEvent) {
     this.interviewService
      .updateInterview(this.getInterviewClientFromEvent(e))
      .subscribe(() =>
        this.matSnack.openSnackBar('The timestamp of the interview is updated')
      );
  }

  onTimeChange(e: CustomEvent) {
    this.interviewService
      .updateInterview(this.getInterviewClientFromEvent(e))
      .subscribe(() =>
        this.matSnack.openSnackBar('The time of the interview is updated')
      );
  }

  private renderInterviewEvent(interview: InterviewClient) {
    this.calendar.fullCalendar('renderEvent', interview);
  }

  private getInterviewClientFromEvent(e: CustomEvent): InterviewClient {
    const { id, candidate, vacancy, start, end, title, place } = e.detail.event;
    const newStart = start.format('YYYY-MM-DD HH:mm:ss');
    const newEnd = end.format('YYYY-MM-DD HH:mm:ss');

    const interviewClient = new InterviewClient(
      candidate,
      vacancy,
      newStart,
      newEnd,
      place,
      title,
      id
    );

    return interviewClient;
  }
}
