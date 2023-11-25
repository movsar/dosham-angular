import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appGestures]'
})
export class GesturesDirective {

  @Output() topDownSwipe = new EventEmitter<void>();
  @Output() leftToRightSwipe = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('swipe', ['$event'])
  onSwipe(event: any) {
    // Check for top-down swipe
    if (event.deltaY > 0 && Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      this.topDownSwipe.emit();
    }

    // Left-to-right swipe
    if (event.deltaX > 0 && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      this.leftToRightSwipe.emit();
    }
  }
}
