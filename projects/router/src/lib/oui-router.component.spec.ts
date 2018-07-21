import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuiRouterComponent } from './oui-router.component';

describe('OuiRouterComponent', () => {
  let component: OuiRouterComponent;
  let fixture: ComponentFixture<OuiRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuiRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuiRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
