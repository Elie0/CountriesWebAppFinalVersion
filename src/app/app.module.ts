import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { CountryContainerModule } from './country-container/country-container.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { CountryDetailsModule } from './country-details/country-details.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuard } from './guard-auth.service';



//http://173.249.40.235:5005/api/User/SignUp()
//http://173.249.40.235:5005/api/User/Login()

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CountryContainerModule,
    ReactiveFormsModule,
    SignUpModule,
    RouterModule,
    CountryDetailsModule,
    LoginModule
   
    
  ],
  providers: [
   
   AuthInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }