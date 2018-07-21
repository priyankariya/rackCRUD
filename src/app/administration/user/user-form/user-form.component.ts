import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { CoreApiService } from '../../../shared/services/api/core-api.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  userForm: FormGroup;
  privileges: any[] = [];

  @Input('user') user;
  @Output() submitUser: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private coreApiService: CoreApiService) {
    this.buildForm();
  }

  ngOnInit() {
    this.listAction();
  }

  ngOnChanges() {
    if (!!this.user) {
      this.listAction();
    }
    this.buildForm();
    this.userForm.controls['password'].clearValidators();
  }

  buildForm() {
    this.userForm = this.fb.group({
      id: new FormControl((this.user) ? this.user.id : null),
      username: new FormControl((this.user) ? this.user.username : null,
        [Validators.required, Validators.pattern(UtilityService.alphaNumericRegex), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required]),
      isCashier: new FormControl((this.user) ? this.user.isCashier : false)
    });
  }

  listAction() {
    this.coreApiService.listAction().subscribe((resultActions) => {
      this.privileges = UtilityService.groupBy(resultActions || [], function (item: any) {
        return [item.component];
      });
      this.loadPrivileges();
    });
  }

  loadPrivileges() {
    if (this.user) {
      for (const i of this.privileges) {
        for (const j of i) {
          for (const k of this.user.permissions) {
            if (j.id === k.action) {
              j['value'] = k.value;
            }
          }
        }
      }
    }
  }

  submit() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      data['permissions'] = [];
      for (const i of this.privileges) {
        for (const j of i) {
          if (j.value) {
            data['permissions'].push({'action': j.id, value: 1});
          }
        }
      }
      this.submitUser.emit(data);
    }
  }

  reset() {
    this.userForm.reset();
    this.listAction();
  }
}
