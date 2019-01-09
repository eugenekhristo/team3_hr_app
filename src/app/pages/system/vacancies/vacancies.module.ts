import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyComponent } from './containers/vacancy/vacancy.component';
import { VacanciesComponent } from './containers/vacancies/vacancies.component';
import { UiModule } from 'src/app/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { EditVacancyDialogComponent } from './presentationals/edit-vacancy-dialog/edit-vacancy-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    VacanciesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [VacancyComponent, VacanciesComponent, EditVacancyDialogComponent],
  entryComponents: [EditVacancyDialogComponent]
})
export class VacanciesModule {}
