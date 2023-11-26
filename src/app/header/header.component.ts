import { Component, OnInit } from '@angular/core';
import { StatisticDataService } from '../services/statistic-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentScore: number = 0;
  searchResultsCount: number = 0;
  constructor(private statisticService: StatisticDataService) { }

  ngOnInit() {
    this.statisticService.searchResultsCount$.subscribe((count) => {
      this.searchResultsCount = count;
    });

    this.statisticService.score$.subscribe((score) => {
      this.currentScore = score;
   });
  }

}
