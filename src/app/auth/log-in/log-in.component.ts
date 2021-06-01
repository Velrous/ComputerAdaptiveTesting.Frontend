import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoading = false;
  hasError = false;
  info = {
    login: "",
    password: ""
  };

  async logIn() {
    this.isLoading = true;
    let authInfo = null;
    try {
      authInfo = await this.authService.logIn(this.info.login, this.info.password);
      this.isLoading = false;
    }
    catch (e) {
      console.error(e);
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    setTimeout(() => {
      if(authInfo) {
        if(this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['./home']);
        }
      }
    }, 10);
  }

  ngOnInit() {
    console.log(this.authService.isLoggedIn)
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}
