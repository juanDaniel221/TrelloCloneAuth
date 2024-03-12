import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { DataSourceUser } from './data-source';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user$ = this.authService.user$;
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.dataSource.init(users);
    });
  }
}
