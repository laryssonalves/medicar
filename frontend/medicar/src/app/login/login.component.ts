import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.userService.tokenUpdated.subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

  initLoginForm(): void {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    this.loginForm = this.formBuilder.group({
      username: [username ? username : '', [Validators.required]],
      password: [password ? password : '', [Validators.required]],
      remember: [username && password ? true : false],
    });
  }

  onSubmitForm(): void {
    event.preventDefault();
    const { username, password, remember } = this.loginForm.value;
    this.userService.login(username, password, remember);
  }
}
