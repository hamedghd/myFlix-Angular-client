import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

const username = localStorage.getItem('user');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser(username);
    this.getUserFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUser(username: any): void {
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }
  openSynopsisDialog(title: string, imageUrl: any, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { title, imageUrl, description, },
      width: '50%'
    })
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, },
      width: '50%'
    })
  }

  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '50%'
    })
  }

  addToFavorites(movieId: any,) {
    console.log(movieId);
    this.fetchApiData.addMovie(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
      this.getUserFavorites();
    });
  }

  removeFromFavorites(movieId: any,) {
    console.log(movieId);
    this.fetchApiData.deleteMovie(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      })

      setTimeout(function () {
        window.location.reload()
      }, 3000);
      this.getUserFavorites();
    });
  }

  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      //console.log(this.faves);
      return this.favoriteMovies;
    });
  }

  isFavorited(id: any): any {
    if (this.favoriteMovies.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}