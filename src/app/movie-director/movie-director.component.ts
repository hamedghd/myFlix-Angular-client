import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(

    /**
     * Inject, gets the movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birth: Date,
      death: Date
    }
  ) { }

  ngOnInit(): void {
  }

}
