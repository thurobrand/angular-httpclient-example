import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public first:  string="";
  public last:  string="";
  public next:  string="";
  public prev:  string="";

  private REST_API_SERVER = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    const options = {params: new HttpParams({fromString: "_page=1&_limit=20"})};
    return this.httpClient.get(this.REST_API_SERVER,options).pipe(retry(3), catchError(this.handleError));
  }

  public parseLinkHeader(header){
    if(header.length==0){
      return;
    }
    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name =section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name]=url;
    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }
}
