import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IResult } from './result';
import { ResultService } from './result.service';

@Component({
  selector: 'app-results',
  templateUrl: './result-list.component.html',
})
export class ResultListComponent implements OnInit, OnDestroy {
  errorMessage = '';
  sub!: Subscription;
  results: IResult[] = [];
  pageTitle: string = 'Result List';
  i: any;
  isShow = false;
  visible: boolean = true;
  buttonTitle: string = 'Show Times';

  name = 'Angular ' + VERSION.major;

  @ViewChild('myNameElem') myNameElem!: ElementRef;

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    console.log('resultlist');
    this.sub = this.resultService.getResults().subscribe({
      next: (results) => {
        this.results = results;
        //  this.filteredResults = this.results;
        // console.log(this.results[0].Legs[0].ArrStnFull);
        console.log(this.results[0].Legs[0].TKTs);
        console.log(this.results[0].Legs);
        console.log(this.results);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  /*
  toggleDisplay() {
    console.log(this.myNameElem.nativeElement.value);
    this.isShow = !this.isShow;
  }

  displayPrices() {
    const myElement = document.getElementById('table3');
    //myElement.style.display = 'block';
  }
*/

  showhideUtility() {
    console.log(this.buttonTitle);
    this.visible = this.visible ? false : true;
    this.buttonTitle = this.visible ? 'Show Times' : 'Show Prices';
  }
}
