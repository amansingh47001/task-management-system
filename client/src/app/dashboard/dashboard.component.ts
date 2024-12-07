import { Component } from '@angular/core';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { TaskComponent } from '../../components/tasks/task/task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DialogComponent, TaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isDialogOpen = false;  // Control the dialog's visibility

  openDialog() {
    this.isDialogOpen = true;  // Open the dialog
  }

  closeDialog() {
    this.isDialogOpen = false;  // Close the dialog
  }
}
