import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('/api/tasks', {
      withCredentials: true,
    });
  }

  addTask(data: Task) {
    return this.http.post('/api/task', data);
  }

  editTask(id: string, data: Task) {
    return this.http.put(`/api/task/${id}`, data);
  }

  updateTaskStatus(id: string, status: 'pending' | 'completed') {
    return this.http.patch(`/api/task/${id}`, { status });
  }

  deleteTask(id: string) {
    return this.http.delete(`/api/task/${id}`);
  }
}
