import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';
import { Region } from '../models/region.model';
import { SousRegion } from '../models/sousregion.model';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  regions: Region[] = [];
  sousRegions: SousRegion[] = [];
  pays: Country[] = [];
  selectedRegion?: Region;
  selectedSousRegion?: SousRegion;
  constructor(private paysService: PaysService) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions() {
    this.paysService.getRegions().subscribe((regions) => {
      this.regions = regions;
    });
  }

  loadSousRegions(region: Region) {
    this.paysService.getSousRegions(region).subscribe((sousRegions) => {
      this.sousRegions = sousRegions;
    });
  }

  loadPays(sousRegion: SousRegion) {
    this.paysService.getPays(sousRegion).subscribe((pays) => {
      this.pays = pays;
    });
  }
  onRegionClick(region: Region) {
    this.loadSousRegions(region);
  }

  onSousRegionClick(sousRegion: SousRegion) {
    this.loadPays(sousRegion);
  }
 
}
/*
<!-- accueil.component.html -->
<div>
  <header class="bg-primary text-white d-flex justify-content-between p-3">
    <div>
      <img src="url_du_logo" alt="Logo de l'application" />
    </div>
    <nav class="d-flex">
      <a class="text-white mx-2">Accueil</a>
      <a class="text-white mx-2">A Propos</a>
      <div>
        <!-- Ajoutez l'icône de notification ici -->
      </div>
    </nav>
  </header>

  
  <div class="container mt-4">
    <h2>Accueil</h2>
    <div class="d-flex">
      <button
        *ngFor="let region of regions"
        class="btn btn-primary mr-2"
        (click)="loadSousRegions(region)"
      >
        {{ region.name }}
      </button>
    </div>

   <div *ngIf="sousRegions.length > 0" class="mt-4">
    <h3>Sous-régions</h3>
    <ul class="list-group">
      <li *ngFor="let sousRegion of sousRegions" class="list-group-item">
        {{ sousRegion.name }}
        <button class="btn btn-link" (click)="loadPays(sousRegion)">Voir les pays</button>
      </li>
    </ul>
  </div>

  <div *ngIf="pays.length > 0" class="mt-4">
    <h3>Pays</h3>
    <ul class="list-group">
      <li *ngFor="let paysItem of pays" class="list-group-item">
        {{ paysItem.name.common }}
      </li>
    </ul>
  </div>
*/
