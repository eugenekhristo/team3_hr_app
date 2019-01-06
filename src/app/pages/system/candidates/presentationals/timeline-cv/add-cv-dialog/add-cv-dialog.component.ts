import { Component, OnInit } from '@angular/core';
import { TIMELINE_ITEM_TYPE } from 'src/app/core/models/candidate.model';
import { CV } from 'src/app/core/models/cv.model';

@Component({
  selector: 'hr-add-cv-dialog',
  templateUrl: './add-cv-dialog.component.html',
  styleUrls: ['./add-cv-dialog.component.scss']
})
export class AddCvDialogComponent implements OnInit {

  chosenFile: CV;

  ngOnInit() {}

  addCV(event) {
    if (event.target.files) {
      this.readFile(event.target.files[0]).then(file => {
        this.chosenFile = file as CV;
      });
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
          mime: reader.result
            .split('base64')[0]
            .substr(reader.result.split('base64')[0].indexOf(':') + 1)
            .slice(0, -1),
          timestamp: Date.now(),
          type: TIMELINE_ITEM_TYPE.cv
        });
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  }

}
