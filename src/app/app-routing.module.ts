import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'play',component:PlayComponent, canActivate:[AuthGuard]},
  {path:'account',component:AccountComponent, canActivate:[AuthGuard]},
  {path:'library',component:LibraryComponent, canActivate:[AuthGuard]},
  {path:'playlist',component:PlaylistComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
