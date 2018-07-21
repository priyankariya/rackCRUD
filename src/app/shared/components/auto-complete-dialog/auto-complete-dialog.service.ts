import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';


import { AutoCompleteDialogComponent } from './auto-complete-dialog.component';
import { CoreService } from '../../../core/core.service';

@Injectable()
export class AutoCompleteDialogService {

  constructor(private dialog: MatDialog, private coreService: CoreService) {}

  openDialog(
    property: { height: string, width: string, disableClose: boolean}, selectedItem, selectedItems, dataStream, title, fields, limit,
    search, multiSelect?: {uniqueKey: string, markedElements: any[]}) {
    if (!this.coreService.dialogMode) {
      const dialogRef = this.dialog.open(AutoCompleteDialogComponent, {
        id: 'autoCompleteDialog',
        height: property.height,
        width: property.width,
        disableClose: property.disableClose
      });

      dialogRef.componentInstance.selectedItem.subscribe((item) => {
        selectedItem(item);
        dialogRef.close();
        dialogRef.componentInstance.selectedItem.unsubscribe();
        this.dialogMode(false);
      });

      dialogRef.componentInstance.selectedItems.subscribe((item) => {
        selectedItems(item);
        dialogRef.close();
        dialogRef.componentInstance.selectedItems.unsubscribe();
        this.dialogMode(false);
      });

      this.dialogMode(true);

      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.dataStream = dataStream;
      dialogRef.componentInstance.autoCompleteFields = fields;
      dialogRef.componentInstance.limitSize = limit;
      dialogRef.componentInstance.searchField = search;
      dialogRef.componentInstance.multiSelect = multiSelect;
    }
  }

  dialogMode(status) {
    this.coreService.dialogMode = status;
  }
}

