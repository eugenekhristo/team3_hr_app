import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'hr-new-cv-dialog',
  templateUrl: './new-cv-dialog.component.html',
  styleUrls: ['./new-cv-dialog.component.scss']
})
export class NewCvDialogComponent implements OnInit {
  chosenFile: any;

  ngOnInit() {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  addCV(event) {
    console.log('event ->', event);

    if (event.target.files) {
      this.readFile(event.target.files[0]).then((file => {
        this.chosenFile = file;
      }));
    }
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      const reader = new FileReader();
      // reads file as URL! Just insert it in link
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({
          name: file.name,
          size: file.size,
          data: reader.result,
          mime: reader.result.split('base64')[0].substr(reader.result.split('base64')[0].indexOf(':') + 1).slice(0, -1)
        });
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

}
