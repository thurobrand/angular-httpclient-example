import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  destroy$: Subject<boolean>  = new Subject<boolean>();
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    window.alert("here " + productIdFromRoute );
    this.dataService.sendGetProductRequest(productIdFromRoute).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
      this.product = res.body;
    })   
  }
 
  ngOnDestroy(){
    this.destroy$.next(true);
    //UnSubscribe from the subject
    this.destroy$.unsubscribe();
  }
    
  
}
