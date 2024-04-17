import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from "./shared/layout/layout.component";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import {MainComponent} from './views/main/main.component';
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {CarouselModule} from "ngx-owl-carousel-o";
import {AgreeComponent} from './views/agree/agree.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AgreeComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    NgOptimizedImage,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
