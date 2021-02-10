import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';

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
     this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
       console.log(data);
       this.products=data;
     })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    //UnSubscribe from the subject
    this.destroy$.unsubscribe();
  }
  
}
