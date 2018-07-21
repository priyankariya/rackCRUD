import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';


import { InvalidMessageDirective } from './invalid-message.directive';

@Directive({
  selector: '[appInvalidType]'
})
export class InvalidTypeDirective implements OnInit {

  @Input('appInvalidType') appInvalidType: string;
  private hasView = false;
  constructor(
    private invalidMessage: InvalidMessageDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  ngOnInit() {
    this.invalidMessage.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if (this.invalidMessage.match(this.appInvalidType)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }
}
