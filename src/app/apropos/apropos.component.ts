import { Component } from '@angular/core';
import { StatisticDataService } from '../services/statistic-data.service';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent {


  rate: number = 0;

constructor(private sta: StatisticDataService) { }

  handleRate(event: number): void {
     console.log('Nouvelle note :', event);
  
     this.sta.updateScore(event);
  }
}
