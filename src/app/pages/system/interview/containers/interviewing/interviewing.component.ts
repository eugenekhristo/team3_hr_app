import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { InterviewService } from '../../../shared/services/interview.service';
import { InterviewStore } from '../../../shared/services/interview-store.service';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';

@Component({
  selector: 'hr-interviewing',
  templateUrl: './interviewing.component.html',
  styleUrls: ['./interviewing.component.scss'],
  providers: [InterviewStore]
})
export class InterviewingComponent implements OnInit {
  interviewId: number;
  interview: InterviewClient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirm: MatConfirmService,
    private interviewService: InterviewService,
    private interviewStore: InterviewStore,
    private interviewDialog: InterviewDialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => (this.interviewId = +params['id']));
    this.interviewStore.interview$.subscribe(
      interview => this.interview = interview
    );
  }

  onDeleteInterview() {
    const confirmRef = this.confirm.open(
      'Are you really wanna delete this interview event? 😱'
    );
    confirmRef.afterClosed().subscribe(res => {
      if (res) {
        this.interviewService
          .deleteInterview(this.interviewId)
          .subscribe(() => {
            this.router.navigate(['interview'], {
              queryParams: {
                event: 'interviewDeleted'
              }
            });
          });
      }
    });
  }

  onUpdateInterview() {
    // TODO: if there is any bugs - make a deep copy of this.interview and pass to the dialog
    this.interviewDialog.open(this.interview, INTERVIEW_DIALOG_TYPES.edit);
  }
}
