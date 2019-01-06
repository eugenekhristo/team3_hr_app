import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  TIMELINE_ITEM_TYPE
} from 'src/app/core/models/candidate.model';
import { Requirement, Vacancy } from 'src/app/core/models/vacancy.model';
import { Feedback, FeedbackItem } from 'src/app/core/models/feedback.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'hr-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  // @Input() requirements: Requirement [] = [];
  @Input() feedback: Feedback;
  @Input() vacancy: Vacancy;
  @Input() interviewer: User;
  @Output() feedbackCreated = new EventEmitter<Feedback>();

  // FIXME: supposed to be as @Input()
  requirements: Requirement[] = [
    new Requirement('Responsible', true, true),
    new Requirement('Sociable', false, true),
    new Requirement('Not pregnant', true, false),
    new Requirement('Children under 3 y.o.', false, false)
  ];
  feedbacksArray: FeedbackItem[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  get notReqPub(): FormArray {
    return <FormArray>this.form.get('notReqPub');
  }

  get notReqPriv(): FormArray {
    return <FormArray>this.form.get('notReqPriv');
  }

  get reqPub(): FormArray {
    return <FormArray>this.form.get('reqPub');
  }

  get reqPriv(): FormArray {
    return <FormArray>this.form.get('reqPriv');
  }

  ngOnInit() {
    this.form = this.fb.group({
      notReqPub: this.fb.array([]),
      notReqPriv: this.fb.array([]),
      reqPub: this.fb.array([]),
      reqPriv: this.fb.array([])
    });

    if (this.feedback) {
      this.feedbacksArray = this.feedbackIntoSingleArray(this.feedback);

      this.feedbacksArray.forEach(requirement =>
        this.addFeedbackItem(
          this.createFeedbackItem(
            requirement.requirement,
            requirement.response,
            requirement.require,
            requirement.public_
          )
        )
      );
    } else {
      this.requirements.forEach(requirement =>
        this.addFeedbackItem(
          this.createFeedbackItem(
            requirement.name,
            '',
            requirement.require,
            requirement.public_
          )
        )
      );
    }

  }

  onSubmit() {
    this.feedbackCreated.emit({
      ...this.form.value,
      timestamp: Date.now(),
      type: TIMELINE_ITEM_TYPE.feedback,
      vacancy: this.vacancy,
      interviewer: this.interviewer
    });
  }

  private createFeedbackItem(
    requirement: string,
    response: string,
    require: boolean,
    public_: boolean
  ): FormGroup {
    return this.fb.group({
      requirement,
      response: [response, require ? Validators.required : ''],
      require,
      public_
    });
  }

  private addFeedbackItem(formGroup: FormGroup): void {
    const require = formGroup.get('require').value;
    const public_ = formGroup.get('public_').value;

    if (!require && public_) {
      this.notReqPub.push(formGroup);
    } else if (!require && !public_) {
      this.notReqPriv.push(formGroup);
    } else if (require && public_) {
      this.reqPub.push(formGroup);
    } else {
      this.reqPriv.push(formGroup);
    }
  }

  private feedbackIntoSingleArray(feedback: Feedback) {
    const {notReqPriv, notReqPub, reqPriv, reqPub} = feedback;
    return [...notReqPriv, ...notReqPub, ...reqPriv, ...reqPub];
  }
}
