import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';


import { MessageBoxComponent } from './message-box.component';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class MessageBoxService {

  constructor(private _location: Location, private dialog: MatDialog, private coreService: CoreService) {}

  show(
    property: { height: string, width: string, disableClose: boolean, position?: {
      top?: string, right?: string, bottom?: string, left?: string
    }}, title, message?) {
    if (!this.coreService.dialogMode) {
      const dialogRef = this.dialog.open(MessageBoxComponent, {
        id: 'messageBox',
        height: property.height,
        width: property.width,
        disableClose: property.disableClose,
        position: property.position
      });

      dialogRef.componentInstance.title = 'Quit ?';
      dialogRef.componentInstance.result.subscribe((result) => {
        if (result) {
          this.goBack();
        }
        dialogRef.close();
        this.dialogMode(false);
      });
      this.dialogMode(true);
    }
  }

  dialogMode(status) {
    this.coreService.dialogMode = status;
  }

  goBack() {
    this._location.back();
  }
}
