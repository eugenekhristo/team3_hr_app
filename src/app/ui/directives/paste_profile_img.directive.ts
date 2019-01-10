import { Directive, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate.model';
import { SnackMessageService } from '../services/snack-messgae.service';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Subscription } from 'rxjs';
import { FilterCandidatesService } from 'src/app/core/services/filter-candidates.service';

@Directive({
  selector: '[hrPasteImg]'
})
export class PasteProfileImgDirective implements OnInit, OnDestroy {
  // hrPasteImg - it's actually as candidate paste from template
  @Input() hrPasteImg: Candidate;
  subscriptionContainer = new Subscription();
  mouseoverHandler: (this: Window, ev: MouseEvent) => void;
  pasteImgHandler: EventListenerOrEventListenerObject;

  constructor(
    private elementRef: ElementRef,
    private candidateStore: CandidatesStore,
    private matSnack: SnackMessageService,
    private filterService: FilterCandidatesService
  ) {}

  ngOnInit() {
    let mouseOverImg = false;
    this.mouseoverHandler = e => {
      if (e.target['classList'].contains('short__img') || (e.target['classList'].contains('short__uploader'))) {
        mouseOverImg = true;
      } else {
        mouseOverImg = false;
      }
    };
    window.addEventListener('mouseover', this.mouseoverHandler);

    const targetImg = this.elementRef.nativeElement as HTMLImageElement;

    this.pasteImgHandler = e => {
      if (mouseOverImg) {
        const newSrc = e['clipboardData'].getData('Text');
        this.hrPasteImg.photo = newSrc;
        const updCanSub = this.candidateStore.updateCandidate(this.hrPasteImg).subscribe(() => {
          targetImg.src = newSrc;
          this._openSnackAndCallBS('Profile picture is updated! 📷');
          this.subscriptionContainer.add(updCanSub);
        });
      }
    };

    window.addEventListener('paste', this.pasteImgHandler);
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
    window.removeEventListener('mouseover', this.mouseoverHandler);
    window.removeEventListener('paste', this.pasteImgHandler);
  }

  private _openSnackAndCallBS(msg: string): void {
    this.matSnack.openSnackBar(msg);
    this.filterService.callAllbehaviorSubjects();
  }
}
