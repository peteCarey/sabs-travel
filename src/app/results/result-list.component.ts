import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IResult } from './result';
import { ResultService } from './result.service';

@Component({
  selector: 'app-results',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class ResultListComponent implements OnInit, OnDestroy {
  errorMessage = '';
  sub!: Subscription;
  results: IResult[] = [];
  pageTitle: string = 'Route';
  i: any;

  pricesTable: boolean = true;
  buttonTitle: string = 'Show Prices';

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.sub = this.resultService.getResults().subscribe({
      next: (results) => {
        this.results = results;
        console.log(this.results[0].Legs[0].TKTs);
        console.log(results[1].Legs[0].TKTs);
        console.log(this.results[0].Legs);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showPricesTables() {
    this.pricesTable = !this.pricesTable;
    this.buttonTitle = this.pricesTable ? 'Show Prices' : 'Show Times';
  }
}
