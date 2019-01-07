import {
  TimelineItem,
  TIMELINE_ITEM_TYPE
} from 'src/app/core/models/candidate.model';
import { CV } from 'src/app/core/models/cv.model';

export class CandidateAssetsService {
  processTimeline(timeline: TimelineItem[]): TimelineItem[] {
    const cv = this.getRecentCV(timeline);
    const notesAndFeedbacks = this.getNotesAndFeedbacks(timeline);
    let resultArr = [];

    if (cv) {
      resultArr = [cv, ...notesAndFeedbacks];
    }

    resultArr.length = 4;

    return resultArr;
  }

  private getNotesAndFeedbacks(timeline: TimelineItem[]): TimelineItem[] {
    timeline.sort((a, b) => b.timestamp - a.timestamp);
    const filteredArr = timeline.filter(
      item =>
        item.type === TIMELINE_ITEM_TYPE.note ||
        item.type === TIMELINE_ITEM_TYPE.feedback
    );

    filteredArr.length = 3;

    return filteredArr;
  }

  private getRecentCV(timeline: TimelineItem[]): CV {
    let foundCv = null;

    timeline.sort((a, b) => b.timestamp - a.timestamp);

    for (const i of timeline) {
      if (i.type === TIMELINE_ITEM_TYPE.cv) {
        foundCv = i;
        break;
      }
    }

    return foundCv;
  }
}
