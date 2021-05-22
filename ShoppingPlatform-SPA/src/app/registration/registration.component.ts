import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userModel: User;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  registerUser(){
    this.userModel = Object.assign({}, this.registrationForm.value);
    this.accountService.register(this.userModel).subscribe(() => {
      this.alertify.success("Account has been created");
      this.router.navigate(['']);
    }, error =>{
      this.alertify.error('Error occured while creating an account');
    })
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      confirmPassword: ['', Validators.required],
      gender: ['male'],
      description: [''],
      city: ['', Validators.required],
      fullAddress: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(fg: FormGroup){
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch': true};
  }

}