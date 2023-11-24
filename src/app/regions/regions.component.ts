import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Region } from '../models/region.model';


@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {
  @Input() region!: Region;
  @Output() regionClick = new EventEmitter<Region>();

  regionClicked() {
    console.log('Region clicked:', this.region);
    this.regionClick.emit(this.region);
  }

}
