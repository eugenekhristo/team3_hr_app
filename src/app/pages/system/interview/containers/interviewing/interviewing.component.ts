import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { InterviewService } from '../../../shared/services/interview.service';
import { InterviewStore } from '../../../shared/services/interview-store.service';
import { InterviewClient } from 'src/app/core/models/interview.model';
import { InterviewDialogService } from 'src/app/ui/modules/interview-dialog/interview-dialog.service';
import { INTERVIEW_DIALOG_TYPES } from 'src/app/ui/modules/interview-dialog/interview-dialog-types';
import { SnackMessageService } from 'src/app/ui/services/snack-messgae.service';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Feedback } from 'src/app/core/models/feedback.model';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/core/models/candidate.model';
import { UrlWatcherService } from 'src/app/core/services/url-watcher.service';

interface ContactsHash {
  phone: Contact[];
  email: Contact[];
  skype: Contact[];
  other: Contact[];
}

@Component({
  selector: 'hr-interviewing',
  templateUrl: './interviewing.component.html',
  styleUrls: ['./interviewing.component.scss']
})
export class InterviewingComponent implements OnInit, OnDestroy {
  interviewId: number;
  interview: InterviewClient;
  subscriptionContainer = new Subscription();

  // for easier template rendering
  contacts: ContactsHash = {
    phone: [],
    email: [],
    skype: [],
    other: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirm: MatConfirmService,
    private interviewService: InterviewService,
    private interviewStore: InterviewStore,
    private interviewDialog: InterviewDialogService,
    private matSnack: SnackMessageService,
    private candidateStore: CandidatesStore,

    public routesWatcher: UrlWatcherService
  ) {}

  ngOnInit() {
    this.interviewStore.bootstrapInterview(+this.route.snapshot.params['id']);

    this.route.params.subscribe(params => (this.interviewId = +params['id']));
    const interviewSub = this.interviewStore.interview$.subscribe(interview => {
      this.interview = interview;
      this.candidateStore.bootstrapCandidate(this.interview.candidate.id);

      this.interview.candidate.contacts.forEach(contact => {
        if (contact.value) {
          this.contacts[contact.type].push(contact);
        }
      });
    });

    this.subscriptionContainer.add(interviewSub);

    this.routesWatcher.setWatchedRoute();
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
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
    const copyInterview = this.deepCopy(this.interview);
    const dialogRef = this.interviewDialog.open(
      copyInterview,
      INTERVIEW_DIALOG_TYPES.edit
    );
    dialogRef.afterClosed().subscribe(interview => {
      if (interview) {
        this.contacts.phone = [];
        this.contacts.email = [];
        this.contacts.skype = [];
        this.contacts.other = [];
        this.interviewStore
          .updateInterview(interview)
          .subscribe(() =>
            this.matSnack.openSnackBar('The interview event is updated!')
          );
      }
    });
  }

  onAddFeedback(feedback: Feedback) {
    this.candidateStore.addFeedback(feedback).subscribe(candidate => {
      this.interviewService.deleteInterview(this.interviewId).subscribe(() => {
        this.router.navigate(['/candidates', candidate.id], {
          queryParams: {
            feedbackAdded: true
          }
        });
      });
    });
  }

  goToCandidatePage() {
    const candidateId = this.interview.candidate.id;
    this.candidateStore
      .bootstrapCandidate(candidateId)
      .then(() => this.router.navigate(['/candidates', candidateId]));
  }

  private deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
