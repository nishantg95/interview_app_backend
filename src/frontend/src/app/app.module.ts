import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { TagsComponent } from './tags/tags.component';
import { ListOfQuestionsComponent } from './list-of-questions/list-of-questions.component';
import { QuestionViewComponent } from './question-view/question-view.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    TagsComponent,
    ListOfQuestionsComponent,
    QuestionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
