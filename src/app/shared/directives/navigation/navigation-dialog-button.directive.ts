import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { focusElement } from './utils';

@Directive({
  selector: '[appNavigationDialogButton]'
})
export class NavigationDialogButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyle();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        focusElement(e, this.el, 'previous', 'button', 'appNavigationDialogButton');
      } else {
        focusElement(e, this.el, 'next', 'button', 'appNavigationDialogButton');
      }
    } else if (e.keyCode === 37) {
      focusElement(e, this.el, 'previous', 'button', 'appNavigationDialogButton');
    } else if (e.keyCode === 39) {
      focusElement(e, this.el, 'next', 'button', 'appNavigationDialogButton');
    }
    return;
  }

  @HostListener('focus', ['$event']) onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#2E333D');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
  }

  @HostListener('blur', ['$event']) onBlur(e) {
    if (!e.relatedTarget || (e.relatedTarget && e.relatedTarget.getAttribute('appNavigationDialogButton')) !== '') {
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'initial');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'initial');
  }

  setStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'border', '0');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
  }
}
