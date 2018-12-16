import { InterviewDialogModule } from './interview-dialog.module';

describe('InterviewDialogModule', () => {
  let interviewDialogModule: InterviewDialogModule;

  beforeEach(() => {
    interviewDialogModule = new InterviewDialogModule();
  });

  it('should create an instance', () => {
    expect(interviewDialogModule).toBeTruthy();
  });
});
