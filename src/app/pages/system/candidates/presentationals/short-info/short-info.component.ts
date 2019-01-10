import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Candidate, Contact } from 'src/app/core/models/candidate.model';
import { MatDialog } from '@angular/material';
import { EditContactsDialogComponent } from '../edit-contacts-dialog/edit-contacts-dialog.component';
import { EditShortInfoDialogComponent } from '../edit-short-info-dialog/edit-short-info-dialog.component';
import { stringify } from '@angular/core/src/render3/util';

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
export class ShortInfoComponent implements OnInit, OnDestroy {
  @Input() candidate$: Observable<Candidate>;
  @Output() candidateChanged = new EventEmitter<Candidate>();
  candidate: Candidate;
  subscriptionContainer = new Subscription();

  // for easier template rendering
  contacts: ContactsHash = {
    phone: [],
    email: [],
    skype: [],
    other: []
  };

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {
    const canSub = this.candidate$.subscribe(candidate => {
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

      this.subscriptionContainer.add(canSub);
    });
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }

  onFileUpload(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const file = inputElement.files[0];
    this.handleFileUpload(file);
  }

  private handleFileUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const candidate = <Candidate>{...this.candidate, photo: reader.result};
      this.candidateChanged.emit(candidate);
    };
  }

  editContacts() {
    const dialogRef = this.matDialog.open(EditContactsDialogComponent, {
      data: this.candidate.contacts
    });

    const afSub = dialogRef.afterClosed().subscribe(contacts => {
      if (contacts) {
        this.candidate = { ...this.candidate, contacts };
        this.candidateChanged.emit(this.candidate);
      }

      this.subscriptionContainer.add(afSub);
    });
  }

  editShortInfo() {
    const dialogRef = this.matDialog.open(EditShortInfoDialogComponent, {
      data: {
        name: this.candidate.name,
        surname: this.candidate.surname
      }
    });

    dialogRef.afterClosed().subscribe((res: {name: string, surname: string}) => {
      if (res) {
        const {name, surname} = res;
        this.candidate = { ...this.candidate, name, surname};
        console.log(this.candidate);
        this.candidateChanged.emit(this.candidate);
      }
    });
  }
}
