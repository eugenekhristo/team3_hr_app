import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  TimelineItem,
  TIMELINE_ITEM_TYPE
} from 'src/app/core/models/candidate.model';

export class Requirement {
  constructor(
    public name: string,
    public require: boolean,
    public public_: boolean
  ) {}
}

export class FeedbackItem {
  constructor(
    public requirement: string,
    public response: string,
    public require: boolean,
    public public_: boolean
  ) {}
}

export class Feedback implements TimelineItem {
  constructor(
    public notReqPub: FeedbackItem[],
    public notReqPriv: FeedbackItem[],
    public reqPub: FeedbackItem[],
    public reqPriv: FeedbackItem[],
    public timestamp: number,
    public type: TIMELINE_ITEM_TYPE.feedback
  ) {}
}

@Component({
  selector: 'hr-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Output() feedbackCreated = new EventEmitter<Feedback>();

  requirements: Requirement[] = [
    new Requirement('Responsible', true, true),
    new Requirement('Sociable', false, true),
    new Requirement('Not pregnant', true, false),
    new Requirement('Children under 3 y.o.', false, false)
  ];

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

  onSubmit() {
    this.feedbackCreated.emit({
      ...this.form.value,
      timestamp: Date.now(),
      type: TIMELINE_ITEM_TYPE.feedback
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
}
