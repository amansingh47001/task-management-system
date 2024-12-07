import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service/task.service';
import { ToastrService } from 'ngx-toastr';

export type Tasks = {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
};

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  allTasks: Tasks[] = [];
  tasks: Tasks[] = [];

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(
      (res: any) => {
        this.allTasks = res?.data;
        this.tasks = res?.data;
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      (res: any) => {
        this.tasks = this.tasks.filter((task) => task._id !== id);
        this.allTasks = this.tasks;
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }

  onTaskUpdated() {
    this.getTasks();
  }

  statusFilter(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    console.log('event: ', value);
    if (value)
      this.tasks = this.allTasks.filter((task) => task.status === value);
    else this.tasks = this.allTasks;
  }

  handleStatusChange(event: Event, id: string) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as 'pending' | 'completed';
    console.log('event: ', value);

    this.taskService.updateTaskStatus(id, value).subscribe(
      (res: any) => {
        console.log('response: ',res);
        this.tasks = this.tasks.map((task) =>
          task._id === id ? { ...task, status: value } : task
        );
        this.allTasks = this.tasks;
        this.toastr.success(res?.message || 'Task status updated successfully');
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }
}
