import { VacanciesModule } from './vacancies.module';

describe('VacanciesModule', () => {
  let vacanciesModule: VacanciesModule;

  beforeEach(() => {
    vacanciesModule = new VacanciesModule();
  });

  it('should create an instance', () => {
    expect(vacanciesModule).toBeTruthy();
  });
});
