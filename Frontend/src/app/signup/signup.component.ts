import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  alertMsg: string = '';
  loading: boolean = false;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
      userType: ["buyer", [Validators.required]],
    })

  }

  get f() { return this.signupForm.controls }


  onSubmit() {
    let rs = this.userService.signUser(this.signupForm.value).subscribe({
      error: () => { this.alertMsg = "error" },
      complete: () => {
        this.alertMsg = "done";
        this.loading = true;
        setTimeout(() => {
          this.alertMsg = "";
          this.loading = false;
          this.router.navigate(["/login"])
        }, 2000)

      }
    });

  }



}
