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

  private REST_API_SERVER = "http://localhost:4040";


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
    // Add safe, URL encoded _page and _limit parameters
    return this.httpClient.get(this.REST_API_SERVER + "/products", {params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }
  public sendGetRequestToUrl(url: string){
    return this.httpClient.get(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));

    }));
  }

  public sendGetProductRequest(productIdFromRoute: string){
    // Add safe, URL encoded _page and _limit parameters
    return this.httpClient.get(this.REST_API_SERVER + "/products/"+productIdFromRoute, 
                              { observe: "response"}).pipe(retry(3),
                               catchError(this.handleError));
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
