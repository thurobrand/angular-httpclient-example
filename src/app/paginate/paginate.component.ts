import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  @Output("first") firstPage: EventEmitter<any> = new EventEmitter();
  @Output("next") nextPage: EventEmitter<any> = new EventEmitter();
  @Output("last") lastPage: EventEmitter<any> = new EventEmitter();
  @Output("prev") prevPage: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  firstPg(){ window.alert("first pg");
         this.firstPage.emit();
  }

  nextPg(){ window.alert("next pg");
      this.nextPage.emit();
  }
  lastPg(){ window.alert("last pg");
      this.lastPage.emit();
  }
  prevPg(){ window.alert("prev pg");
     this.prevPage.emit();
  }

}
