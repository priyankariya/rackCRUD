import { TestBed, inject } from '@angular/core/testing';

import { OuiRouterService } from './oui-router.service';

describe('OuiRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OuiRouterService]
    });
  });

  it('should be created', inject([OuiRouterService], (service: OuiRouterService) => {
    expect(service).toBeTruthy();
  }));
});
