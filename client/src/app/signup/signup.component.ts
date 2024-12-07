import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      console.log('data: ', data);
    }
  }
}

