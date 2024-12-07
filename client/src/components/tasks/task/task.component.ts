import { Component, Input, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import { TaskService } from '../../../services/task-service/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DialogComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Output() taskUpdated = new EventEmitter<void>();
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() taskData: any;
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('pending', Validators.required),
  });
  isDialogOpen = false;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.mode === 'edit') {
      this.taskForm.patchValue({
        title: this.taskData.title || '',
        description: this.taskData.description || '',
        status: this.taskData.status || 'pending',
      });
    }
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { title, description, status } = this.taskForm.value;
      const payload = {
        title: title || '',
        description: description || '',
        status: status as 'pending' | 'completed',
      };

      if (this.mode === 'edit') {
        const id = this.taskData._id;
        this.taskService.editTask(id, payload).subscribe(
          (res: any) => {
            this.toastr.success(res?.message || 'Task updated successfully');
            this.taskUpdated.emit();
            this.closeDialog();
          },
          (error) => {
            this.toastr.error(error?.error?.message || 'Task update failed');
          }
        );
      } else {
        this.taskService.addTask(payload).subscribe(
          (res: any) => {
            this.toastr.success(res?.message);
            this.taskUpdated.emit();
            this.closeDialog();
          },
          (error) => {
            this.toastr.error(error?.error?.message || 'Task add failed');
          }
        );
      }
    }
  }
}
