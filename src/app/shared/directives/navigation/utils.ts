// Navigation directives utility functions

export function setFocus(elements, idx, method, maxIdx) {
  let exists = false;
  for (let i = 0; i < maxIdx; i++) {
    if (elements[i] && elements[i].getAttribute('tabindex') === ((method === 'next') ? idx + 1 : idx - 1).toString()) {
      elements[i].focus();
      exists = true;
    }
  }
  if (!exists && idx > 0 && idx <= maxIdx) {
    setFocus(elements, (method === 'next') ? idx + 1 : idx - 1, method, maxIdx);
  }
}

function isInputValid(e, method) {
  if (method === 'next') {
    const inputClass = e.nativeElement.getAttribute('class')
    if (inputClass) {
      if (inputClass.toString().split(' ').indexOf('ng-invalid') > -1) {
        return false;
      }
    }
  }
  return true;
}

export function focusElement(e, element, method, tag, directive) {
  e.preventDefault();
  if ((tag !== 'input') || (tag === 'input' && isInputValid(element, method))) {
    const focusId = element.nativeElement.getAttribute('focusid');
    const elements = document.querySelectorAll(tag);
    let filteredElements = [];
    let maxIdx = 0;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].getAttribute(directive) === '') {
        if (focusId && (focusId === elements[i].getAttribute('focusid'))) {
          filteredElements.push(elements[i]);
        }
        const tabIdx = parseInt(elements[i].getAttribute('tabindex'), 10);
        if (tabIdx > maxIdx) {
          maxIdx = tabIdx;
        }
      }
    }
    setFocus(filteredElements, element.nativeElement.tabIndex, method, maxIdx);
  }
}
