import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../common/forms.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const formValue = this.form.value;

    if (formValue.email && formValue.password) {
      this.authService
        .login(formValue.email, formValue.password)
        .subscribe(() => {
          console.log("User is successfully logged in");
          this.router.navigateByUrl("/");
        });
    }
  }
}
