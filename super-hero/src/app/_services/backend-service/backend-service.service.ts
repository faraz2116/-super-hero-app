import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { startWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  private _baseUrl = 'http://localhost:3000/';
  private _api: any;

  constructor(private http: HttpClient) { 
    this._api = {
      CALLHERO : this._baseUrl + 'callHero',
      SEARCHUSER: this._baseUrl + 'search/users',
      USERDETAIL: this._baseUrl + 'users',
      FOLLOWERS: this._baseUrl + 'users'
    }
  }

  // Common Method to call API
  execute(request: string, url: string, data: any) {
    // JSON API
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // this.http.post() or this.http.get()
    if (request == 'get') {
      let response = this.http.get<any>(url, httpOptions);
      // storing the reponse in localstorage for caching
      response.subscribe(beers => {
        localStorage[url] = JSON.stringify(beers)
      });
      // fetching response from local storage if key Found stored response
      response = response.pipe(
        startWith(JSON.parse(localStorage[url] || '[]'))
      )
      return response;
    } else {
        return this.http.post<any>(url, data, httpOptions);
    }
  }

  // Common Method for Posting Data
  post(url: string, data: any) {
      return this.execute('post', url, data);
  }

  // Common Method for Posting Data
  get(url: string) {
      return this.execute('get', url, null);
  }

  callHero(code){
    console.log("Code",code)
    const url = this._api.CALLHERO + '/' + code;
    const httpOptions = {
      withCredentials: true,
      responseType: 'json' as 'json'
    };

    // return this.get(url)
    return this.http.post<any>(url, {}, httpOptions);

    // return this.post(url,{code : code})
  }

}
