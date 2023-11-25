import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[appGestures]'
})
export class GesturesDirective implements OnInit, OnDestroy {

  @Output() topDownSwipe = new EventEmitter<void>();
  @Output() leftToRightSwipe = new EventEmitter<void>();
  private hammerManager?: HammerManager;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.hammerManager = new Hammer.Manager(this.el.nativeElement, {
      touchAction: 'pan-y'
    });

    this.hammerManager.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));

    this.hammerManager.on('swipe', (event) => {
      switch (event.direction) {
        case Hammer.DIRECTION_RIGHT:
          this.debouncedEmit(this.leftToRightSwipe);
          break;
        case Hammer.DIRECTION_DOWN:
          this.debouncedEmit(this.topDownSwipe);
          break;
      }
    });
  }

  ngOnDestroy() {
    if (this.hammerManager) {
      this.hammerManager.destroy();
    }
  }

  private debouncedEmit(emitter: EventEmitter<void>) {
    // Implement debounce logic here
    emitter.emit();
  }
}
