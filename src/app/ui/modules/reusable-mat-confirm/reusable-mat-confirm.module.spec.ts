import { ReusableMatConfirmModule } from './reusable-mat-confirm.module';

describe('ReusableMatConfirmModule', () => {
  let reusableMatConfirmModule: ReusableMatConfirmModule;

  beforeEach(() => {
    reusableMatConfirmModule = new ReusableMatConfirmModule();
  });

  it('should create an instance', () => {
    expect(reusableMatConfirmModule).toBeTruthy();
  });
});
