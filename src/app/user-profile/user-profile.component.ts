import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      this.user = res;
      console.log(res);
    });
  }
  deleteAccount(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.deleteUser(/*username*/).subscribe((res: string) => {
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
      console.log(res);
      this.snackBar.open('You have deleted your account succesfully!', 'OK', {
        duration: 4000,
      });
      localStorage.clear();

    });
  }
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      // Assigning the dialog a width
      width: '50%'
    });
  }
}
