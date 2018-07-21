import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ElectronService } from 'ngx-electron';
import { CoreApiService } from '../../shared/services/api/core-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registered = false;
  exitTimer = 5;
  exitInterval: any;

  constructor(private fb: FormBuilder, private electronService: ElectronService, private coreApiService: CoreApiService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      'displayName': new FormControl(null, [Validators.required]),
      'activationKey': new FormControl(null, [Validators.required])
    });
  }

  registerClient() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.electronService.ipcRenderer.send('systemInformation');
      this.electronService.ipcRenderer.on('systemInformation', (event, data) => {
        formData.si = data;
        this.coreApiService.registerClient(formData).subscribe((result) => {
          const clientID = this.electronService.ipcRenderer.sendSync('setKey', {key: 'clientID', value: result.id});
          const token = this.electronService.ipcRenderer.sendSync('setKey', {key: 'token', value: result.token});
          if (clientID && token) {
            this.registered = true;
            setTimeout(() => {
              this.restartApp();
            });
          }
        });
      });

    }
  }

  restartApp() {
    this.exitInterval = setInterval(() => {
      this.exitTimer -= 1;
      if (this.exitTimer === 0) {
        this.electronService.ipcRenderer.sendSync('restart');
      }
    }, 1000);
  }
}
