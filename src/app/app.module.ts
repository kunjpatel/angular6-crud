import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactModule } from './contacts/contact.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', redirectTo: 'contacts', pathMatch: 'full'},
        { path: '**', redirectTo: 'contacts', pathMatch: 'full'}
    ]),
    ContactModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
