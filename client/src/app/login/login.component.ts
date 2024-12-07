import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private UserService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const payload = {
        email: email || '',
        password: password || '',
      };

      this.UserService.loginUser(payload).subscribe(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res?.data));
          this.toastr.success(res?.message);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.toastr.error(error?.error?.message || 'User login failed');
        }
      );
    }
  }
}
