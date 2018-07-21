import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { focusElement } from './utils';

@Directive({
  selector: '[appNavigationInput]'
})
export class NavigationInputDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyle();
  }

  @HostBinding('attr.autocomplete') autocomplete = 'off';
  @HostBinding('attr.spellcheck') spellcheck = 'false';

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        focusElement(e, this.el, 'previous', 'input, textarea', 'appNavigationInput');
      } else {
        focusElement(e, this.el, 'next', 'input, textarea', 'appNavigationInput');
      }
    } else if (e.keyCode === 38) {
      focusElement(e, this.el, 'previous', 'input, textarea', 'appNavigationInput');
    } else if (e.keyCode === 13 || e.keyCode === 40) {
      focusElement(e, this.el, 'next', 'input, textarea', 'appNavigationInput');
    }
    return;
  }

  @HostListener('focus', ['$event']) onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#2E333D');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
  }

  @HostListener('blur', ['$event']) onBlur(e) {
    if ((!e.relatedTarget || (e.relatedTarget && e.relatedTarget.tagName !== 'MAT-DIALOG-CONTAINER'))) {
      if (!e.relatedTarget) {
        setTimeout(() => {
          this.el.nativeElement.focus();
        });
      }
    }
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'initial');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'initial');
  }

  setStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
    if (this.el.nativeElement.getAttribute('type') !== 'checkbox') {
      this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    }
    this.renderer.setStyle(this.el.nativeElement, 'border', '0');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '16px');
  }
}
