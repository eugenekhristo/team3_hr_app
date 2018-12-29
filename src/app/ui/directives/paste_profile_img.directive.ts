import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from '../services/snack-messgae.service';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';

@Directive({
  selector: '[hrPasteImg]'
})
export class PasteProfileImgDirective implements OnInit {
  // hrPasteImg - it's actually as candidate paste from template
  @Input() hrPasteImg: Candidate;

  constructor(
    private elementRef: ElementRef,
    private candidateService: CandidatesStore,
    private matSNack: SnackMessageService
  ) {}

  ngOnInit() {
    let mouseOverImg = false;
    window.addEventListener('mouseover', e => {
      if (e.target['classList'].contains('short__img')) {
        mouseOverImg = true;
      } else {
        mouseOverImg = false;
      }
    });
    const targetImg = this.elementRef.nativeElement as HTMLImageElement;
    window.addEventListener('paste', e => {
      if (mouseOverImg) {
        const newSrc = e['clipboardData'].getData('Text');
        this.hrPasteImg.photo = newSrc;
        this.candidateService.updateCandidate(this.hrPasteImg).subscribe(() => {
          targetImg.src = newSrc;
          this.matSNack.openSnackBar('Profile picture is updated!');
        });
      }
    });
  }
}
