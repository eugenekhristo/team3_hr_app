import { Component, OnInit, Input } from '@angular/core';
import { CV } from 'src/app/core/models/cv.model';

@Component({
  selector: 'hr-inter-assets-cv',
  templateUrl: './inter-assets-cv.component.html',
  styleUrls: ['./inter-assets-cv.component.scss']
})
export class InterAssetsCvComponent implements OnInit {
  @Input() cv: CV;

  constructor() { }

  ngOnInit() {
  }

  downloadCv(cv: CV) {
    const a = document.createElement('a');
    a.download = cv.name;
    a.href = cv.data;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  }

}
