import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  strongPasswordValidator,
  emailValidator,
  passwordMatchValidator,
  trimSpacesValidator,
} from '../../utils/form-validators';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        trimSpacesValidator(),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        trimSpacesValidator(),
      ]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        strongPasswordValidator(),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') }
  );
  constructor(
    private router: Router,
    private UserService: UserService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      const payload = {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        password: password || '',
      };


      this.UserService.registerUser(payload).subscribe(
        (res: any) => {
          this.toastr.success(res?.message || 'User registered successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('error: ', error);
          this.toastr.error(error?.error?.message || 'Failed to register user');
        }
      );
    }
  }
}
