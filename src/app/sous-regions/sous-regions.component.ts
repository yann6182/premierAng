import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SousRegion } from '../models/sousregion.model';

@Component({
  selector: 'app-sous-regions',
  templateUrl: './sous-regions.component.html',
  styleUrls: ['./sous-regions.component.scss']
})
export class SousRegionsComponent {
  @Input() sousRegion!: SousRegion;
  @Output() sousRegionClick = new EventEmitter<SousRegion>();

  sousRegionClicked() {
    this.sousRegionClick.emit(this.sousRegion);
  }
}
