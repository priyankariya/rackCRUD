import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';


import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '../../core/layout/sidebar/sidebar.service';

@Component({
  selector: 'app-network-configuration',
  templateUrl: 'network-configuration.component.html',
  styleUrls: ['./../configuration.component.scss', 'network-configuration.component.scss']
})
export class NetworkConfigurationComponent implements OnInit {

  dialogMode = false;
  networkConfigurationForm: FormGroup;

  constructor(private _location: Location, private fb: FormBuilder, private dialog: MatDialog, private sidebarService: SidebarService) {

  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (!this.dialogMode && this.dialog.openDialogs.length === 0) {
      if (e.keyCode === 27) {
        this.goBack();
      }
    }
  }

  ngOnInit() {
    this.buildForm();
    this.sidebarService.disableConfiguration.emit(true);
  }

  buildForm() {
    const api = (localStorage.getItem('api')) ? JSON.parse(localStorage.getItem('api')) : null;
    this.networkConfigurationForm = this.fb.group({
      api: [api, [Validators.required]]
    });
  }

  goBack() {
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      height: '90px',
      width: '160px',
      disableClose: true,
      position: {right: '40px', bottom: '40px'}
    });

    dialogRef.componentInstance.title = 'Quit ?';
    dialogRef.componentInstance.result.subscribe((result) => {
      if (result) {
        this._location.back();
      }
      dialogRef.close();
      this.dialogMode = false;
    });
    this.dialogMode = true;
  }

  submitNetworkConfigurationForm() {
    if (this.networkConfigurationForm.valid) {
      const formValue = this.networkConfigurationForm.value;
      localStorage.setItem('api', JSON.stringify(formValue.api));
      this._location.back();
    }
  }

}
