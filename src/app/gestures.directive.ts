import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[appGestures]'
})
export class GesturesDirective {

  @Output() topDownSwipe = new EventEmitter<void>();
  @Output() leftToRightSwipe = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('swipe', ['$event'])
  onSwipe(event: any) {
    event.preventDefault();

    switch (event.direction) {
      case Hammer.DIRECTION_RIGHT:
        // Gets called twice per swipe
        this.leftToRightSwipe.emit();
        break;

      case Hammer.DIRECTION_DOWN:
        this.topDownSwipe.emit();
        break;

    }
  }
}
