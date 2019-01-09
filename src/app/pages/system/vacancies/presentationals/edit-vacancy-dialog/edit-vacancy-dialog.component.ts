import { Component, OnInit, Inject } from '@angular/core';
import { Vacancy, VACANCY_STATUS } from 'src/app/core/models/vacancy.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'hr-edit-vacancy-dialog',
  templateUrl: './edit-vacancy-dialog.component.html',
  styleUrls: ['./edit-vacancy-dialog.component.scss']
})
export class EditVacancyDialogComponent implements OnInit {
  statusTypes: VACANCY_STATUS[];
  form: FormGroup;

  get requirements(): FormArray {
    return <FormArray>this.form.get('requirements');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vacancy,
    private fb: FormBuilder,
    private matConfirm: MatConfirmService
  ) {}

  ngOnInit() {
    this.statusTypes = Object.values(VACANCY_STATUS);

    this.form = this.fb.group({
      title: [this.data && this.data.title, Validators.required],
      status: [this.data && this.data.status || VACANCY_STATUS.opend, Validators.required],
      description: [this.data && this.data.description],
      requirements: this.fb.array([])
    });

    if (this.data && this.data.requirements.length > 0) {
      this.data.requirements.forEach(requirement => {
        this.addRequirement(
          requirement.name,
          requirement.require,
          requirement.public_,
          requirement.id
        );
      });
    }
  }

  createRequirementGroup(
    name: string = '',
    require: boolean = false,
    _public: boolean = false,
    id: string = uuid()
  ): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      require,
      _public,
      id
    });
  }

  addRequirement(
    name: string = '',
    require: boolean = false,
    _public: boolean = false,
    id: string
  ): void {
    this.requirements.push(this.createRequirementGroup(name, require, _public, id));
  }

  deleteRequirement(i: number): void {
    this.matConfirm
      .open('Are you sure you wanna delete this requirement ⁉')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.requirements.removeAt(i);
        }
      });
  }
}
