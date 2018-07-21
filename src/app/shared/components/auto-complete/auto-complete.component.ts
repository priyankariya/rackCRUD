import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-auto-complete',
  templateUrl: 'auto-complete.component.html',
  styleUrls: ['auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnChanges {

  @ViewChildren('items') items: QueryList<ElementRef>;

  @Input('limitSize') limitSize = 1;

  @Input('fields') fields: [{caption: string, dataField: string, width: number}];

  @Input('searchField') searchField = '';
  @Input('reload') reload;

  @Input('dataStream') dataStream: any;

  @Input('multiSelect') multiSelect: { uniqueKey: string, markedElements: any[]};

  @Output('selectedItem') selectedItem: EventEmitter<any> = new EventEmitter<any>();

  @Output('selectedItems') selectedItems: EventEmitter<any> = new EventEmitter<any>();

  focusedElement: any;

  searchText = '';

  asyncData = [];

  offset = 0;

  empty = false;
  loading = false;
  markedElements: any[] = [];

  constructor(private dialog: MatDialog) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    if (this.dialog.openDialogs.length === 0 || this.dialog.getDialogById('autoCompleteDialog')) {
      if (e.keyCode === 8) {
        if (this.searchText.length > 0) {
          this.searchText = this.searchText.substring(0, this.searchText.length - 1);
          this.offset = 0;
          this.listAsyncValues(this.searchParams(this.searchText), 'next');
        }
      } else if (e.keyCode === 9) {
        e.preventDefault();
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (this.multiSelect) {
          this.selectedItems.emit(this.markedElements);
        }
      } else if (!e.ctrlKey && ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105))) {
        this.searchText = this.searchText + String(e.key);
        this.offset = 0;
        this.listAsyncValues(this.searchParams(this.searchText), 'next');
      }
    }
  }

  ngOnChanges() {
    if (!!this.multiSelect && this.multiSelect) {
      this.markedElements = [];
      for (const i of this.multiSelect.markedElements) {
        this.markedElements.push(i);
      }
      this.setMarkStyle();
    }
    if (!!this.reload && this.reload) {
      this.listAsyncValues(this.searchParams(this.searchText), 'next');
    }
  }

  searchParams(searchText) {
    const searchParams = {};
    searchParams[this.searchField] = searchText;
    searchParams['limit'] = this.limitSize;
    searchParams['offset'] = this.offset;
    return searchParams;
  }

  markElement(element) {
    if (this.multiSelect) {
      element['marked'] = !element['marked'];
      if (element['marked']) {
        this.markedElements.push(element);
      } else {
        const arr = [];
        for (const i of this.markedElements) {
          if (i.id !== element.id) {
            arr.push(i);
          }
        }
        this.markedElements = arr;
      }
    }
  }

  setMarkStyle() {
    if (this.multiSelect) {
      for (const i of this.asyncData) {
        for (const j of this.markedElements) {
          if (i[this.multiSelect.uniqueKey] === j[this.multiSelect.uniqueKey]) {
            i['marked'] = true;
          }
        }
      }
    }
  }

  nextPage(idx) {
    if (idx === this.limitSize && !this.empty) {
      this.offset += this.limitSize;
      this.listAsyncValues(this.searchParams(this.searchText), 'next');
    }
  }

  previousPage(idx) {
    if (idx === 1 && this.offset > 0) {
      this.offset -= this.limitSize;
      this.listAsyncValues(this.searchParams(this.searchText), 'previous');
    }
  }

  listAsyncValues(searchParams, method: string) {
    this.empty = false;
    this.loading = true;
    this.dataStream(searchParams).subscribe((result: any[]) => {
      if (result.length > 0) {
        this.asyncData = result;
        this.setMarkStyle();
      } else {
        this.offset -= this.limitSize;
        if (this.offset <= 0) {
          this.empty = true;
        }
      }
      setTimeout(() => {
        if (method === 'next') {
          if (this.items.first) {
            setTimeout(() => {
              this.items.first.nativeElement.focus();
            });
          }
        } else if (method === 'previous') {
          if (this.items.last) {
            setTimeout(() => {
              this.items.last.nativeElement.focus();
            });
          }
        }
      });
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  selectItem(item?: any) {
    if (this.multiSelect) {
      this.selectedItems.emit(this.markedElements);
    } else {
      this.selectedItem.emit(item);
    }
  }

  onFocusElement(item) {
    this.focusedElement = item;
  }
}
