import { Component, OnInit } from '@angular/core';
import { CandidatesStore } from 'src/app/core/services/candidate-store.service';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hr-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  constructor(
    public candidateStore: CandidatesStore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.candidateStore.bootstrapCandidate(+this.route.snapshot.params['id']);
  }
}
