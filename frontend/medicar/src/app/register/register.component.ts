import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { MustMatch } from '../helpers/mustmatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmpassword'),
      }
    );
  }

  onSubmitForm(): void {
    event.preventDefault();
    this.submitted = true;
    if (this.registerForm.valid) {
      const { firstName, email, password } = this.registerForm.value;
      const newUser = new User(firstName, email, email, password);
      newUser.username = this.registerForm.value.email;
      this.userService.register(newUser).subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }
}
