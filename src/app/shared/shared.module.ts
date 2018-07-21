import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatIconModule, MatIconRegistry } from '@angular/material';


import {NgxElectronModule} from 'ngx-electron';
import { ApiService } from './services/api/api.service';
import { RequestService } from './services/api/request.service';
import { CoreApiService } from './services/api/core-api.service';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { NavigationButtonDirective } from './directives/navigation/navigation-button.directive';
import { AutoFocusDirective } from './directives/navigation/auto-focus.directive';
import { NavigationInputDirective } from './directives/navigation/navigation-input.directive';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { NavigationDialogButtonDirective } from './directives/navigation/navigation-dialog-button.directive';
import { AutoCompleteDialogComponent } from './components/auto-complete-dialog/auto-complete-dialog.component';
import { InvalidMessageDirective } from './directives/validation/invalid-message.directive';
import { InvalidTypeDirective } from './directives/validation/invalid-type.directive';
import { AdministrationApiService } from './services/api/administration-api.service';
import { SetFocusDirective } from './directives/navigation/set-focus.directive';
import { MasterApiService } from './services/api/master-api.service';
import { AutoCompleteDialogService } from './components/auto-complete-dialog/auto-complete-dialog.service';
import { MessageBoxService } from './components/message-box/message-box.service';
import { TransactionApiService } from './services/api/transaction-api.service';
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    NgxElectronModule
  ],
  declarations: [
    AutoCompleteComponent,
    AutoCompleteDialogComponent,
    MessageBoxComponent,
    SpinnerComponent,
    NavigationButtonDirective,
    NavigationInputDirective,
    NavigationDialogButtonDirective,
    InvalidMessageDirective,
    InvalidTypeDirective,
    AutoFocusDirective,
    SetFocusDirective
  ],
  entryComponents: [
    MessageBoxComponent,
    AutoCompleteDialogComponent
  ],
  providers: [
    ApiService,
    RequestService,
    CoreApiService,
    AdministrationApiService,
    MasterApiService,
    TransactionApiService,
    AutoCompleteDialogService,
    MessageBoxService,
    MatIconRegistry
  ],
  exports: [
    FlexLayoutModule,
    AutoCompleteComponent,
    SpinnerComponent,
    NavigationButtonDirective,
    NavigationInputDirective,
    NavigationDialogButtonDirective,
    InvalidMessageDirective,
    InvalidTypeDirective,
    AutoFocusDirective,
    SetFocusDirective
  ]
})
export class SharedModule { }
