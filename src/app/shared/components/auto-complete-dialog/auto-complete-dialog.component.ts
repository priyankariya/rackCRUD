import { Component, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-auto-complete-dialog',
  templateUrl: 'auto-complete-dialog.component.html',
  styleUrls: ['auto-complete-dialog.component.scss']
})
export class AutoCompleteDialogComponent {

  title: string;
  limitSize: number;
  autoCompleteFields: any[];
  searchField: string;
  dataStream: any;
  multiSelect: { uniqueKey: string, markedElements: any[] };
  selectedItem: EventEmitter<any> = new EventEmitter<any>();
  selectedItems: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 27) {
      if (this.multiSelect) {
        this.selectedItems.emit([]);
      } else {
        this.selectedItem.emit('');
      }
    }
  }

  onAutoCompleteSelect($event) {
    this.selectedItem.emit($event);
  }

  onAutoCompleteMultiSelect($event) {
    this.selectedItems.emit($event);
  }

}
