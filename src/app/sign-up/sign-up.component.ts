import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.createSignUpForm();
  }

  createSignUpForm():void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      roleName: ['', Validators.required] 
    });
  }

  CommonErrors(field: string): boolean {
    const check = this.signUpForm?.get(field)?.invalid &&
      (this.signUpForm?.get(field)?.dirty || this.signUpForm?.get(field)?.touched);
    if (check) {
      return true;
    }
    return false;
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.loading = true;
  
      this.http.post('http://173.249.40.235:5005/api/User/SignUp()', formData)
        .pipe(
          catchError(error => {
            console.error('API error:', error);
            return of(null);
          })
        )
        .subscribe(response => {
          console.log('API response:', response);
          this.loading = false;
          this.router.navigate(['/signin']);
        });
    }
}
}
