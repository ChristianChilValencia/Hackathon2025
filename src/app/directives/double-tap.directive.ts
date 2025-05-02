import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[doubletap]',
  standalone: true
})
export class DoubleTapDirective {
  @Output() doubletap = new EventEmitter();
  
  private lastTapTime = 0;
  private readonly doubleTapThreshold = 300; // Time in ms for detecting double tap

  @HostListener('tap', ['$event'])
  onTap(event: any) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - this.lastTapTime;
    
    if (timeDifference < this.doubleTapThreshold && timeDifference > 0) {
      event.preventDefault();
      this.doubletap.emit(event);
    }
    
    this.lastTapTime = currentTime;
  }
}