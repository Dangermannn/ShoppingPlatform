import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userModel: any = {}
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  registerUser(){
    this.userModel.username = this.registrationForm.get('username').value;
    this.userModel.password = this.registrationForm.get('password').value;
    console.log(this.userModel);
    this.accountService.register(this.userModel).subscribe(() => {
      this.alertify.success("Account has been created");
    }, error =>{
      this.alertify.error('Error occured while creating an account');
    })
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup){
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch': true};
  }

}