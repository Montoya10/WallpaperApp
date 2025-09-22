import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonSpinner, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  standalone: false
  
})
export class ImageGridComponent {
  @Input() imageUrls: string[] = [];
  @Input() isLoading: boolean = false;
  @Output() imageRemoved = new EventEmitter<number>();

  constructor() {}

  removeImage(index: number) {
    this.imageRemoved.emit(index);
  }
}