import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
const username = localStorage.getItem('user');
@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  /**
   * Required input fields for updating the user information
   */
  @Input() userData = { Username: username, Password: '', Email: '', Birth: '' };

  constructor(
    public fetchUserData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Edits the user information
   */
  editUserInfo(): void {
    this.fetchUserData.editUser(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();
        localStorage.setItem('user', res.Username);
        this.snackBar.open('Profile updated successfully!', 'Ok', {
          duration: 2000,
        });
      },
      (res) => {
        console.log(res);
        this.snackBar.open(res, 'Ok', {
          duration: 2000,
        });
      }
    );

    setTimeout(function () {
      window.location.reload();
    }, 1000);

  }
}

