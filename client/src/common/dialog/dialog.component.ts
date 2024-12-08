import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() isOpen: boolean = false;  // Control the visibility of the dialog
  @Input() title: string = '';  // Title of the dialog
  @Input() dialogWidth: string = 'max-w-sm';  // Default width, can be customized
  @Input() dialogContent: string = '';  // Default content
  @Output() close = new EventEmitter<void>();  // Event to close the dialog

  closeDialog() {
    this.close.emit();  // Emit the close event
  }
}
