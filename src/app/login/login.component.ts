import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap,catchError,throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  signInForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.createSignInForm();
  }


  createSignInForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  CommonErrors(field: string): boolean {
    const check =
      this.signInForm?.get(field)?.invalid &&
      (this.signInForm?.get(field)?.dirty ||
        this.signInForm?.get(field)?.touched ||
        this.signInForm);
    if (check) {
      return true;
    }
    return false;
  }

  signIn(): void {
    console.log("called from here")
    const username = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    

    this.authService.login(username, password)
        .pipe(
            tap(() => {
                this.router.navigate(['/countries']);
            }),
            catchError((error) => {
                this.errorMessage = error.message;
                return throwError(() => new Error(error));
            })
        )
        .subscribe(()=>{console.log("called from here")});

}
}
