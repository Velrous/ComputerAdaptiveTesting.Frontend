import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/test/models/role.model';
import { AuthService } from '../auth.service';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles: Role[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.getRolesForRegistration().subscribe((roles) => {
      this.roles = roles.map(item => {
        return {Id: item.Id, Name: item.Name};
      });
    });
    console.log("roles", this.roles);
  }

  isLoading = false;
  hasError = false;
  registerForm = null;
  registrationModel = {
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: null
  };

  ngOnInit() {
  }

  register() {
    if(this.registrationModel.password == this.registrationModel.confirmPassword)
    {
      let registerModel = new RegisterModel(
        null,
        this.registrationModel.login,
        this.registrationModel.password,
        null,
        this.registrationModel.roleId,
        true,
        this.registrationModel.email
      );
      console.log("Register", registerModel);
      this.authService.register(registerModel);
    }
  }
}
