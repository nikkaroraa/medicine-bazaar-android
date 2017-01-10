import {Component} from '@angular/core';
import {Auth} from '../../providers/auth';

@Component({
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  // We need to inject AuthService so that we can
  // use it in the view
  constructor(public auth: Auth) {}
}