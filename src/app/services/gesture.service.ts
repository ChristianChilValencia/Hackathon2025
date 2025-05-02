import { Injectable, NgZone } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Subject } from 'rxjs';

// Define our own interface that extends the base GestureDetail
interface PinchGestureDetail {
  scale?: number;
  startX?: number;
  startY?: number;
  currentX?: number;
  currentY?: number;
  velocityX?: number;
  velocityY?: number;
  deltaX?: number;
  deltaY?: number;
  timeStamp?: number;
  event?: any;
  data?: any;
  type?: string;
}

export interface ScaleChangeEvent {
  scale: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestureService {
  private scaleChange = new Subject<ScaleChangeEvent>();
  scaleChange$ = this.scaleChange.asObservable();
  
  private currentScale = 1;
  private initialScale = 1;
  private MIN_SCALE = 0.8;
  private MAX_SCALE = 1.5;

  constructor(
    private gestureCtrl: GestureController,
    private zone: NgZone
  ) {}

  initializePinchGesture(element: HTMLElement) {
    const gesture = this.gestureCtrl.create({
      el: element,
      threshold: 0,
      gestureName: 'pinch',
      onStart: (detail: PinchGestureDetail) => {
        this.onPinchStart(detail);
      },
      onMove: (detail: PinchGestureDetail) => {
        this.onPinchMove(detail);
      },
      onEnd: () => {
        this.onPinchEnd();
      }
    }, true);
    
    gesture.enable();
    return gesture;
  }

  private onPinchStart(detail: PinchGestureDetail) {
    this.initialScale = this.currentScale;
  }

  private onPinchMove(detail: PinchGestureDetail) {
    if (!detail.scale) return;
    
    // Calculate new scale based on the pinch gesture scale
    let newScale = this.initialScale * detail.scale;
    
    // Limit scaling to reasonable bounds
    newScale = Math.max(this.MIN_SCALE, Math.min(newScale, this.MAX_SCALE));
    
    // Update the scale and notify subscribers
    this.currentScale = newScale;
    
    // Use NgZone to ensure Angular detects the changes
    this.zone.run(() => {
      this.scaleChange.next({ scale: newScale });
    });
  }

  private onPinchEnd() {
    // The current scale becomes the initial scale for the next gesture
    this.initialScale = this.currentScale;
  }

  // Method to reset scale if needed
  resetScale() {
    this.currentScale = 1;
    this.initialScale = 1;
    this.scaleChange.next({ scale: 1 });
  }
}