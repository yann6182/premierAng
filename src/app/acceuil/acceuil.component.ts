import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';
import { Region } from '../models/region.model';
import { SousRegion } from '../models/sousregion.model';
import { Country } from '../models/country.model';
import { Observable, filter,map,BehaviorSubject, combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  regions$: Observable<Region[]> | undefined;
  sousRegions$: Observable<SousRegion[]>| undefined;
  selectedRegion?: Region;
  selectedSousRegion?: SousRegion;
  totalItems: number = 0; 
  currentPage: number = 1;
  pageSize = 10;
  searchText = '';
  paysArray: Country[] = [];
  paginatedPays: any[] = [];
  filteredPays: any[] = [];
  totalItems$: Observable<number> | undefined;
  private currentPageSubject = new BehaviorSubject<number>(1);
currentPage$ = this.currentPageSubject.asObservable();

private pageSizeSubject = new BehaviorSubject<number>(10);
pageSize$ = this.pageSizeSubject.asObservable();

private paysSubject = new BehaviorSubject<Country[]>([]);
pays$ = this.paysSubject.asObservable();

paginatedPays$: Observable<Country[]> | undefined;

  constructor(private paysService: PaysService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.regions$ = this.paysService.getRegions();
    this.paginatedPays$ = combineLatest([
      this.currentPage$,
      this.pageSize$,
      this.pays$
    ]).pipe(
      map(([currentPage, pageSize, pays]) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return pays.slice(startIndex, endIndex);
      })
    );
  }
  
  private updatePaginatedPays(): void {
    if (this.pays$) {
      this.pays$.pipe(
        map((pays: Country[]) => {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;

          return pays.slice(startIndex, endIndex);
        })
      ).subscribe((paginatedPays: Country[]) => {
        this.paginatedPays = paginatedPays;
      });
    }
  }
  loadRegions() {
    this.regions$ = this.paysService.getRegions();
  }

  loadSousRegions(region: Region) {
    this.selectedRegion = region;
    this.sousRegions$ = this.paysService.getSousRegions(region);
  }

  loadPays(sousRegion: SousRegion) {
    this.selectedSousRegion = sousRegion;
    this.pays$ = this.paysService.getPays(sousRegion);
  }
  onRegionClick(region: Region) {
    this.loadSousRegions(region);
  }

  onSousRegionClick(sousRegion: SousRegion) {
    this.loadPays(sousRegion);
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.updatePaginatedPays();
  }



  

  containsSearchText(paysItem: Country): boolean {
    const searchTerms = this.searchText.toLowerCase().split(' ');
    for (const term of searchTerms) {
      if (
        paysItem.name.common.toLowerCase().includes(term) ||
        paysItem.name.official.toLowerCase().includes(term)
      ) {
        return true;
      }
    }
    return false;
  }
  
  onSearch(): void {
    if (this.searchText.trim() !== '') {
      this.pays$ = this.pays$.pipe(
        map((pays) =>
          pays.filter((paysItem) => this.containsSearchText(paysItem))
        )
      );
      this.toastr.success('Recherche effectuée avec succès');
    } else {
      if (this.selectedSousRegion) {
        this.loadPays(this.selectedSousRegion);
        this.toastr.success('Champ de recherche vide. Affichage de tous les pays.');
      } else {
        this.loadRegions();
        this.toastr.success('Champ de recherche vide. Affichage de toutes les regions.');}
    }
    this.updatePaginatedPays();
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
