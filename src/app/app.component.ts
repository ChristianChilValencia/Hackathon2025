import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private currentScale = 1;
  private initialTouchDistance = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Add touch event listeners for pinch gesture handling
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }

  // Handle the start of a touch event to initialize pinch detection
  private handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      // Calculate initial distance between two fingers
      this.initialTouchDistance = this.getTouchDistance(event);
    }
  }

  // Handle touch movement to calculate pinch scale
  private handleTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      // Prevent default behavior like page scrolling
      event.preventDefault();
      
      // Calculate current distance between fingers
      const currentDistance = this.getTouchDistance(event);
      
      if (this.initialTouchDistance > 0) {
        // Calculate scale based on the change in distance
        const scale = currentDistance / this.initialTouchDistance;
        
        // Apply the scale with some limits to prevent extreme values
        this.applyScale(scale);
      }
    }
  }

  // Calculate the distance between two touch points
  private getTouchDistance(event: TouchEvent): number {
    const dx = event.touches[0].clientX - event.touches[1].clientX;
    const dy = event.touches[0].clientY - event.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Apply the scale and adjust aspect ratio
  private applyScale(scale: number) {
    // Apply limits to the scale factor
    const limitedScale = Math.max(0.8, Math.min(1.5, scale * this.currentScale));
    
    // Get app container
    const appElement = document.querySelector('ion-app') as HTMLElement;
    
    if (appElement) {
      // Apply transform scale
      this.renderer.setStyle(appElement, 'transform', `scale(${limitedScale})`);
      this.renderer.setStyle(appElement, 'transform-origin', 'center center');
      
      // Adjust the aspect ratio based on scale
      // When scaling up, make width wider and height shorter (and vice versa)
      const width = 100 * (limitedScale > 1 ? limitedScale : 1);
      const height = 100 * (limitedScale < 1 ? 1/limitedScale : 1);
      
      this.renderer.setStyle(appElement, 'width', `${width}%`);
      this.renderer.setStyle(appElement, 'height', `${height}%`);
      
      // Make sure content remains centered
      this.renderer.setStyle(appElement, 'margin', 'auto');
    }
  }

  // Reset values on touch end
  private handleTouchEnd() {
    if (this.initialTouchDistance > 0) {
      // Store the current scale for the next gesture
      this.currentScale = Math.max(0.8, Math.min(1.5, this.currentScale));
      this.initialTouchDistance = 0;
    }
  }
}
