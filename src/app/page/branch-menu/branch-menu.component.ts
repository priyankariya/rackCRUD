import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';


import { CoreService } from '../../core/core.service';
import { AdministrationApiService } from '../../shared/services/api/administration-api.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-branch-menu',
  templateUrl: 'branch-menu.component.html',
  styleUrls: ['branch-menu.component.scss']
})
export class BranchMenuComponent implements OnInit, AfterViewInit {
  multiBranchFocusHandler: EventEmitter<any> = new EventEmitter<any>();
  branches: any[] = [];

  @ViewChildren('branchItems')branchItems: QueryList<ElementRef>;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
    if ((e.keyCode === 27) || (e.ctrlKey && e.keyCode === 81)) {
      this.goBack();
    }
  }

  constructor(private router: Router, private coreService: CoreService, private administrationApiService: AdministrationApiService) {}

  ngOnInit() {
    this.administrationApiService.listBranchMenu({client_id: this.coreService.getProperty('clientID')}).subscribe((resultBranch) => {
      this.branches = resultBranch;
    });
  }

  ngAfterViewInit() {
    if (this.branchItems && this.branchItems.length === 0) {
      setTimeout(() => {
        this.multiBranchFocusHandler.emit(true);
      });
    }
    this.branchItems.changes.subscribe(() => {
      if (this.branchItems) {
        this.branchItems.first.nativeElement.focus();
      }
    });
  }

  goBack() {
    this.router.navigate(['/organization']).then(() => {});
  }

  setBranch(branch) {
    if (branch) {
      this.coreService.setProperty('branch', branch);
      this.coreService.statusChanged.emit(true);
    }
    this.router.navigate(['/gateway']).then(() => {});
  }
}
