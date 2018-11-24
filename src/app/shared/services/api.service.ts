import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from '../../../environments/environment';
import { IJoke } from '../interface/joke.interface';
/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class RequestService {
  Joke: JokeController;

  constructor(private http: Http) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Vary', 'Accept-Encoding');
    // headers.append('Access-Control-Allow-Origin','*');

    const config = new ControllerConfig(http, headers);

    this.Joke = new JokeController(config, 'Joke');
  }
}
export class Controller {
  protected headers: Headers;
  protected http: Http;
  protected url: string = environment.base_url;
  constructor(config: ControllerConfig, endpoint: string) {
    this.http = config.http;
    this.headers = config.headers;

  }

  protected Post<T>(path: string = '', body: any): Observable<T> {

    return this.http.post(this.url + path, body, { headers: this.headers })
      .map(response => {
        const res = (response.json());
        return res;
      });
  }

  protected Get<T>(path: string = ''): Observable<T> {
    return this.http.get(this.url + path)
      .map(response => {
        const res = (response.json());
        return res;
      });
  }

}

export class ControllerConfig {
  headers: Headers;
  http: Http;
  url: string;

  constructor(http: Http, headers: Headers) {
    this.headers = headers;
    this.http = http;
  }
}

export class JokeController extends Controller {

  GetCategoryList(): Observable<string[]> {
      return this.Get<string[]>(`jokes/categories`);
  }

  GetRandomJoke(): Observable<IJoke> {
      return this.Get<IJoke>(`jokes/random`);
  }

  GetCategoryJoke(category: string): Observable<IJoke> {
      return this.Get<IJoke>(`jokes/random?category=${category}`);
  }

  GetJokeByFreeText(query: string): Observable<IJoke[]> {
      return this.Get<IJoke[]>(`jokes/search?query=${query}`);
  }
}
