import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products =[];
  destroy$: Subject<boolean>  = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
      this.products = res.body;
    })   
  }
  
  ngOnDestroy(){
    this.destroy$.next(true);
    //UnSubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }

  addToCart(id){
    window.alert("Adding " + id + " to cart!");
  }
  showDetail(id){
    window.alert("Details for " + id);
  }

}
