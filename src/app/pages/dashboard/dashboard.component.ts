import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private userService: UserService,
    public globalService: GlobalService
  ) {
  }

  logout() {
    this.userService.logout();
  }
}
