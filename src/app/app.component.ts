import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  model = {
    user: 'your name',
    comment: 'your comment',
  };

  // List of users
  users = [];

  // List of posts
  posts = [];

  // Like counters for each post
  likes = [0, 0, 0];

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {
    this.httpClient
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((response) => {
        this.posts = response;
      });
    this.httpClient
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .subscribe((response) => {
        this.users = response;
      });
  }

  ngOnInit() {}

  onSubmit() {
    this.snackbar.open(
      'Comment submitted. User: ' +
        this.model.user +
        ', Comment length: ' +
        this.model.comment.length,
      'OK',
      { duration: 3000 }
    );
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  findUser(post) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == post.userId) {
        return this.users[i];
      }
    }
  }

  onLikeClick(event, post) {
    this.likes[post] += 1;
  }
}
