import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetFocus]'
})
export class SetFocusDirective implements AfterViewInit {
  @Input() appSetFocus: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.appSetFocus.subscribe(() => {
      this.el.nativeElement.focus();
      this.cdr.detectChanges();
    });
  }
}
