import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CallMeDialogComponent} from './components/call-me-dialog/call-me-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderOfferDialogComponent} from './components/order-offer-dialog/order-offer-dialog.component';
import {MatMenuModule} from "@angular/material/menu";
import {BrowserModule} from "@angular/platform-browser";
import { OkDialogComponent } from './components/ok-dialog/ok-dialog.component';


@NgModule({
  declarations: [
    CallMeDialogComponent,
    OrderOfferDialogComponent,
    OkDialogComponent
  ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        MatMenuModule,
        ReactiveFormsModule
    ],
  exports: [
    CallMeDialogComponent,
    OrderOfferDialogComponent
  ]
})
export class SharedModule {
}
