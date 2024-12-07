import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import type { Tasks } from '../../../services/task-service/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DialogComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() taskData:Tasks;
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('pending', Validators.required),
  });
  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const data = this.taskForm.value;
      console.log('data: ', data);
    }
  }
}
