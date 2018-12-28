import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Contact } from 'src/app/core/models/contact.model';
import { MatDialog } from '@angular/material';
import { EditContactsDialogComponent } from '../edit-contacts-dialog/edit-contacts-dialog.component';

interface ContactsHash {
  phone: Contact[];
  email: Contact[];
  skype: Contact[];
  other: Contact[];
}

@Component({
  selector: 'hr-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss']
})
export class ShortInfoComponent implements OnInit {
  @Input() candidate$: Observable<Candidate>;
  @Output() candidateChanged = new EventEmitter<Candidate>();
  candidate: Candidate;

  // for easier template rendering
  contacts: ContactsHash = {
    phone: [],
    email: [],
    skype: [],
    other: []
  };

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {
    this.candidate$.subscribe(candidate => {
      this.contacts.phone = [];
      this.contacts.email = [];
      this.contacts.skype = [];
      this.contacts.other = [];

      if (candidate) {
        this.candidate = candidate;
        if (this.candidate.contacts) {
          this.candidate.contacts.forEach(contact => {
            if (contact.value) {
              this.contacts[contact.type].push(contact);
            }
          });
        }
      }
    });
  }

  editContacts() {
    const dialogRef = this.matDialog.open(EditContactsDialogComponent, {
      data: this.candidate.contacts
    });

    dialogRef.afterClosed().subscribe(contacts => {
      if (contacts) {
        this.candidate = { ...this.candidate, contacts };
        this.candidateChanged.emit(this.candidate);
      }
    });
  }
}
