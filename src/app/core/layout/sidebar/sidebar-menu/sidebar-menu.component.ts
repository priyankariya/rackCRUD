import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {

  @Input('item') item: any;
  @Input('shortcut') shortcut: any;
  @Input('keyCode') keyCode: any;
  @Input('link') link: any;
  @Input('disabled') disabled: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === this.keyCode) {
      e.preventDefault();
      this.selectItem();
    }
  }

  selectItem() {
    if (!this.disabled) {
      this.router.navigate([this.link], {relativeTo: this.activatedRoute}).then(() => { });
    }
  }
}
