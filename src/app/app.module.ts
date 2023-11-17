import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchQueryComponent } from './views/search-query/search-query.component';
import { SearchResultsComponent } from './views/search-results/search-results.component';
import { EntryComponent } from './views/entry/entry.component';
import { TranslationComponent } from './views/translation/translation.component';
import { EntryActionButtonsComponent } from './views/entry-action-buttons/entry-action-buttons.component';
import { MainComponent } from './pages/main/main.component';
import { IndexComponent } from './pages/index/index.component';
import { PagerComponent } from './views/pager/pager.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DonateComponent } from './pages/donate/donate.component';
import { ApiComponent } from './pages/api/api.component';
import { TranslationActionButtonsComponent } from './views/translation-action-buttons/translation-action-buttons.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormErrorsComponent } from './views/form-errors/form-errors.component';
import { EmailSentComponent } from './views/email-sent/email-sent.component';
import { UserStoreService } from './services/user-store.service';
import { ContentStoreService } from './services/content-store.service';
import { TranslationEditComponent } from './views/translation-edit/translation-edit.component';
import { WordDetailsEditComponent } from './views/word-details-edit/word-details-edit.component';
import { WordSelectorComponent } from './views/word-selector/word-selector.component';
import { EntryEditComponent } from './pages/entry-edit/entry-edit.component';
import { ConfirmationDialogComponent } from './views/confirmation-dialog/confirmation-dialog.component';
import { WordSelectorDialogComponent } from './views/word-selector-dialog/word-selector-dialog.component';
import { EntrySelectorDialogComponent } from './views/entry-selector-dialog/entry-selector-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchQueryComponent,
    SearchResultsComponent,
    EntryComponent,
    TranslationComponent,
    EntryActionButtonsComponent,
    MainComponent,
    IndexComponent,
    PagerComponent,
    DonateComponent,
    ApiComponent,
    TranslationActionButtonsComponent,
    LoginComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    RegistrationComponent,
    FormErrorsComponent,
    EmailSentComponent,
    TranslationEditComponent,
    WordDetailsEditComponent,
    WordSelectorComponent,
    EntryEditComponent,
    ConfirmationDialogComponent,
    WordSelectorDialogComponent,
    EntrySelectorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserStoreService, ContentStoreService],
  bootstrap: [AppComponent],
})
export class AppModule { }
