import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { SidebarService } from '../../core/layout/sidebar/sidebar.service';
import { CoreApiService } from '../../shared/services/api/core-api.service';
import { CoreService } from '../../core/core.service';
import {UtilityService} from '../../shared/services/utility.service';
import { ElectronService } from 'ngx-electron';

const isDev = require('electron-is-dev');

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  organization;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private electronService: ElectronService,
    private sidebarService: SidebarService,
    private coreService: CoreService,
    private coreApiService: CoreApiService,
  ) { }

  ngOnInit() {
    this.sidebarService.disableConfiguration.emit(true);
    this.sidebarService.disableFeatures.emit(true);
    this.buildForm();
  }


  buildForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      data.organization = this.coreService.getProperty('organization').id;
      this.coreApiService.login(data).subscribe((resultUser) => {
        this.coreService.setProperty('user', resultUser);
        this.router.navigate(['/branch'], { replaceUrl: true }).then(() => {});
        this.coreService.statusChanged.emit(true);
      });
    }
  }
}
