import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent {
  @Input() pays!: Country;
  @Output() paysClick = new EventEmitter<Country>();

  paysClicked() {
    this.paysClick.emit(this.pays);
  }

}
