import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CONTACT_TYPES, Contact } from 'src/app/core/models/candidate.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatConfirmService } from 'src/app/ui/modules/reusable-mat-confirm/mat-confirm-service';

@Component({
  selector: 'hr-edit-contacts-dialog',
  templateUrl: './edit-contacts-dialog.component.html',
  styleUrls: ['./edit-contacts-dialog.component.scss']
})
export class EditContactsDialogComponent implements OnInit {
  contactTypes: string[];
  form: FormGroup;

  get contacts(): FormArray {
    return <FormArray>this.form.get('contacts');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact[],
    private fb: FormBuilder,
    private matConfirm: MatConfirmService
  ) {}

  ngOnInit() {
    this.contactTypes = Object.values(CONTACT_TYPES);
    this.form = this.fb.group({
      contacts: this.fb.array([])
    });
    if (this.data.length > 0) {
      this.data.forEach(contact => {
        this.addContact(contact.type, contact.value, contact.preferred);
      });
    }
  }

  createContactGroup(
    type: string = '',
    value: string = '',
    preferred: boolean = false
  ): FormGroup {
    return this.fb.group({
      type: [type, Validators.required],
      value: [value, Validators.required],
      preferred
    });
  }

  addContact(
    type: string = '',
    value: string = '',
    preferred: boolean = false
  ): void {
    this.contacts.push(this.createContactGroup(type, value, preferred));
  }

  deleteContact(i: number): void {
    this.matConfirm
      .open('Are you sure wanna delete this contact?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.contacts.removeAt(i);
        }
      });
  }
}
