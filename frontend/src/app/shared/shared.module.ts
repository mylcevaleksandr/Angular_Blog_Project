import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CallMeDialogComponent } from './components/call-me-dialog/call-me-dialog.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CallMeDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
}
