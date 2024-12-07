import { Injectable } from '@angular/core';

export type Tasks = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
};

type Task = {
  title: string;
  description: string;
  status: 'pending' | 'completed';
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks: Tasks[] = [];

  constructor() {}

  getAllTasks() {
    const data = [
      {
        id: 1,
        name: 'Task 1',
        description: 'Task 1 Description',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'Task 2 Description',
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'Task 3 Description',
      },
    ];

    return data;
  }

  addTask(data: Task) {
    console.log('data: ', data);
    // this.tasks.push(data);
  }

  editTask(id: string, data: Task) {
    console.log('id: ', id);
    console.log('data: ', data);
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...data };
      }
      return task;
    });
  }

  deleteTask(id: string) {
    console.log(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
