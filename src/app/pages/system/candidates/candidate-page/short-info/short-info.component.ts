import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Candidate} from '../../../../../core/models/candidate.model';
import {CandidateService} from '../../../../../core/services/candidate.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {SnackMessageService} from '../../../../../ui/services/snack-messgae.service';
import {MatConfirmService} from '../../../../../ui/modules/reusable-mat-confirm/mat-confirm-service';

export interface Contacts {
  name?: string;
  value?: string;
  preferred?: boolean;
}

@Component({
  selector: 'hr-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss']
})

export class ShortInfoComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;

  contacts: Contacts[] = [
    {
      name: 'Telephone',
      value: '',
      preferred: false
    },
    {
      name: 'Email',
      value: '',
      preferred: false
    },
    {
      name: 'Skype',
      value: '',
      preferred: false
    }
    ];

  check: Array<boolean> = [false, false, false];

  constructor(public dialog: MatDialog,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private snackMessage: SnackMessageService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.candidate.contacts) {
      this.candidate.contacts = this.contacts;
    } else {
      for (let i = 0; i < 3; i++) {
        if (this.candidate.contacts[i]) {
          this.contacts[i] = this.candidate.contacts[i];
          if (this.candidate.contacts[i].preferred) {
            this.check[i] = this.candidate.contacts[i].preferred;
          } else {
            this.candidate.contacts[i].preferred = false;
          }
        }
      }
      this.candidate.contacts = this.contacts;
    }
  }

  onFileUpload(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const file = inputElement.files[0];
    this.handleFileUpload(file);
    console.log(e);
  }

  private handleFileUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.candidate.photo = reader.result as string;
    };
  }

  preferContact(i) {
    if (this.check[i] === true) {
      this.check[i] = false;
      this.candidate.contacts[i].preferred = false;
      console.log(this.candidate.contacts[i].preferred);
    } else if (this.check[i] === false) {
      this.check[i] = true;
      this.candidate.contacts[i].preferred = true;
      console.log(1);
    }
  }

  saveToDb() {
    this.candidateService
      .update(this.candidate)
      .subscribe((res: any) => {
        this.snackMessage.openSnackBar('Candidate was updated');
        console.log(res);
      });
  }
}
