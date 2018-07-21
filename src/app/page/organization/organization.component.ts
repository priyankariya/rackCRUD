import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ElectronService } from 'ngx-electron';
import { CoreApiService } from '../../shared/services/api/core-api.service';
import { CoreService } from '../../core/core.service';

const isDev = require('electron-is-dev');

@Component({
  selector: 'app-organization',
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss']
})
export class OrganizationComponent implements OnInit, AfterViewInit {

  organizations;

  @ViewChildren('organizationItems') organizationItems: QueryList<ElementRef>;

  constructor(
    private coreApiService: CoreApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private electronService: ElectronService
  ) {}

  ngOnInit() {
    const clientID = this.electronService.ipcRenderer.sendSync('getKey', {key: 'clientID'});
    const token = this.electronService.ipcRenderer.sendSync('getKey', {key: 'token'});
    if (clientID && token) {
      this.electronService.ipcRenderer.send('systemInformation');
      this.electronService.ipcRenderer.on('systemInformation', (event, data) => {
        this.coreApiService.validateClient({clientId: clientID, token: token, si: data}).subscribe((result) => {
          this.electronService.ipcRenderer.sendSync('setKey', {key: 'token', value: result.token});
          this.coreApiService.listOrganization({client_id: clientID}).subscribe((resultOrganizations) => {
            this.organizations = resultOrganizations;
          });
        }, () => {
          this.router.navigate(['registration']).then(() => {});
        });
      });
    } else {
      this.router.navigate(['registration']).then(() => {});
    }
  }

  ngAfterViewInit() {
    this.organizationItems.changes.subscribe(() => {
      if (this.organizationItems) {
        this.organizationItems.first.nativeElement.focus();
      }
    });
  }

  selectOrganization(organization) {
    if (organization) {
      this.coreService.setProperty('organization', organization);
      this.router.navigate(['login']).then(() => {});
    }
  }

  exit() {
    this.electronService.ipcRenderer.sendSync('exit');
  }
}
