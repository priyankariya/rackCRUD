import { Component, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-box',
  templateUrl: 'message-box.component.html',
  styleUrls: ['message-box.component.scss']
})
export class MessageBoxComponent {

  title = 'Untitled';
  result: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<MessageBoxComponent>) {}

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 27 || e.keyCode === 78) {
      this.result.emit(false);
      this.dialogRef.close();
    } else if (e.keyCode === 89) {
      this.result.emit(true);
    }
  }
}
