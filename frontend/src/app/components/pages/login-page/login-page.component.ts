import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { usermodel } from 'src/app/shared/models/user-model';
const USER_KEY = 'User'
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
loginForm!:FormGroup;
isSubmitted = false;
returnUrl = '';
constructor(private formbuilder : FormBuilder, private userService:UserService, private activatedroute:ActivatedRoute, private router:Router){

}

ngOnInit():void{
  this.loginForm = this.formbuilder.group({
    email : ['', [Validators.required,Validators.email]],
    password:['', Validators.required]
  })

  this.returnUrl = this.activatedroute.snapshot.queryParams.returnUrl;
}

get fc(){
  return this.loginForm.controls;
}

submit(){
  this.isSubmitted = true;
  if (this.loginForm.invalid) {
    return
  }


  this.userService.login({
    email: this.fc.email.value,
    password:this.fc.password.value
  }).subscribe(()=>{
    this.router.navigateByUrl(this.returnUrl)
  })
}



}
