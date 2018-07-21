import { Component, HostListener, ViewChild } from '@angular/core';


import { UserFormComponent } from '../user-form/user-form.component';
import { CoreApiService } from '../../../shared/services/api/core-api.service';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../core/core.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
  styleUrls: ['user-create.component.scss']
})
export class UserCreateComponent {

  @ViewChild('userForm') userForm: UserFormComponent;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveUser.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private coreApiService: CoreApiService,
    private messageBoxService: MessageBoxService,
    private coreService: CoreService
  ) {}

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveUser() {
    this.userForm.submit();
  }

  onSubmitUser(user) {
    this.coreApiService.register(user).subscribe(() => {
        this.userForm.reset();
        this.coreService.statusHandler.emit('User saved successfully...');
    });
  }
}
