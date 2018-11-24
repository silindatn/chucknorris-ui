import { Component, ViewChild, OnInit } from '@angular/core';
import { RequestService } from './shared/services/api.service';
import { IJoke } from './shared/interface/joke.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chucknorris-ui';
  selectedValue: string;
  query: string;
  categoryList: string[] = [];
  joke: IJoke = null;
  // jokes: IJoke[] = [];
  displayedColumns = ['joke'];
  jokes = new MatTableDataSource<IJoke>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private request: RequestService){
    this.GetCategoryList();
  }

  ngOnInit(){
    this.jokes.paginator = this.paginator;
  }

  GetCategoryList() {
    this.request.Joke.GetCategoryList().subscribe(categories => {
      this.categoryList = categories;
    })
  }

  GetRandomJoke(event) {
    this.joke = null;
    if (event.index === 1){
    this.request.Joke.GetRandomJoke().subscribe(joke => {
      this.joke = joke;
    })
  }
  }
  GetCategoryJoke() {
    this.joke = null;
    this.request.Joke.GetCategoryJoke(this.selectedValue).subscribe(joke => {
      this.joke = joke;
    })
  }
  GetJokeByFreeText() {
    this.joke = null;
    this.request.Joke.GetJokeByFreeText(this.query).subscribe(result => {
      this.jokes.data = result['result'];
    })
  }
}
