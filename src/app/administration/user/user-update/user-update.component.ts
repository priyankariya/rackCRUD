import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { CoreApiService } from '../../../shared/services/api/core-api.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-user-update',
  templateUrl: 'user-update.component.html',
  styleUrls: ['user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  user: any;

  @ViewChild('userForm') userForm: UserFormComponent;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveUser.bind(this), this.goBack.bind(this)
      );
  }

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreApiService: CoreApiService,
    private messageBoxService: MessageBoxService,
    ) {}

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.coreApiService.getUser({id: params['id']}).subscribe((result) => {
        this.user = result;
      });
    });
  }

  saveUser() {
    this.userForm.submit();
  }

  onSubmitUser(user) {
    this.coreApiService.updateUser(user).subscribe((result) => {
        this.userForm.reset();
        this._location.back();
    });
  }
}
