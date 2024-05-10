import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserModule} from "@angular/platform-browser";
import {OkDialogComponent} from './components/ok-dialog/ok-dialog.component';
import {ServiceCardComponent} from './components/service-card/service-card.component';
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {CommentComponent} from './components/comment/comment.component';


@NgModule({
  declarations: [
    OkDialogComponent,
    ServiceCardComponent,
    ArticleCardComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  exports: [
    ArticleCardComponent,
    CommentComponent
  ]
})
export class SharedModule {
}
