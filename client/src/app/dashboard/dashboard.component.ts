import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { TasksComponent } from '../../components/tasks/tasks.component';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TasksComponent, DialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isDialogOpen = false;
  tasks = [];

  constructor(
    private toastr: ToastrService,
    private UserService: UserService,
    private router: Router
  ) {}

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  logout() {
    this.UserService.logout().subscribe(
      (res: any) => {
        localStorage.clear();
        this.toastr.success(res?.message || 'User logged out successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error(error?.error?.message || 'User login failed');
      }
    );
  }
}
