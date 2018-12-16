import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Candidate} from '../../../../../core/models/candidate.model';

@Component({
  selector: 'hr-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss']
})
export class ShortInfoComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;

  check: Array<boolean> = [false, false, false];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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

  change(i) {
    if (this.check[i] === true) {
      this.check[i] = false;
    } else if (this.check[i] === false) {
      this.check[i] = true;
    }
  }
}
