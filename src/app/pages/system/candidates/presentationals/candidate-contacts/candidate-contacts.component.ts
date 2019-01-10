import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/core/models/candidate.model';

interface ContactsHash {
  phone: Contact[];
  email: Contact[];
  skype: Contact[];
  other: Contact[];
}

@Component({
  selector: 'hr-candidate-contacts',
  templateUrl: './candidate-contacts.component.html',
  styleUrls: ['./candidate-contacts.component.scss']
})
export class CandidateContactsComponent implements OnInit {
  @Input() contactsArr: Contact[];

    // for easier template rendering
    contacts: ContactsHash = {
      phone: [],
      email: [],
      skype: [],
      other: []
    };

  constructor() { }

  ngOnInit() {
    if (this.contactsArr) {
      this.contactsArr.forEach(contact => {
        if (contact.value) {
          this.contacts[contact.type].push(contact);
        }
      });
    }
  }

}
