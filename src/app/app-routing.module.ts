import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard-auth.service';

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./country-container/country-container.module').then(m => m.CountryContainerModule),
    canActivate: [AuthGuard]
    
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then(m=>m.SignUpModule)
  },

  {
    path: 'signin',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  { path: 'countries/name/:name',
    loadChildren: () => import('./country-details/country-details.module').then(m=>m.CountryDetailsModule)
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

