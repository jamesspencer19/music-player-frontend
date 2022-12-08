import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { RegistrationComponent } from './registration/registration.component';
import { LibraryComponent } from './library/library.component';
import { AccountComponent } from './account/account.component';
import { SearchPipe } from './search.pipe';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PlayComponent,
    LibraryComponent,
    AccountComponent,
    SearchPipe,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
