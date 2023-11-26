import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';
import { Region } from '../models/region.model';
import { SousRegion } from '../models/sousregion.model';
import { Country } from '../models/country.model';
import { Observable, filter,map,BehaviorSubject, combineLatest, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StatisticDataService } from '../services/statistic-data.service';

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
  graphAfrique$: Observable<any[]> = of([]); 
  graphEurope$: Observable<any[]> = of([]); 
  graphAsia$: Observable<any[]> = of([]);   
  graphAmerica$: Observable<any[]> = of([]);
  graphTopGDP$: Observable<any[]> | undefined;
  totalItems$: Observable<number> | undefined;
  private currentPageSubject = new BehaviorSubject<number>(1);
currentPage$ = this.currentPageSubject.asObservable();

private pageSizeSubject = new BehaviorSubject<number>(0);
pageSize$ = this.pageSizeSubject.asObservable();

private paysSubject = new BehaviorSubject<Country[]>([]);
pays$ = this.paysSubject.asObservable();
private notificationSubject = new BehaviorSubject<string>('');
notification$ = this.notificationSubject.asObservable();
private searchResultsCountSubject = new BehaviorSubject<number>(0);
searchResultsCount$ = this.searchResultsCountSubject.asObservable();

private loadGraphData(region: string, limit: number): Observable<any[]> {
  return this.statisticService.getTopCountriesByPopulation(region, limit);
}
paginatedPays$: Observable<Country[]> | undefined;

  constructor(private paysService: PaysService, private toastr: ToastrService, private statisticService:StatisticDataService) {}

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
    this.graphAfrique$ = this.statisticService.getTopCountriesByPopulation('Africa', 10);
    this.graphEurope$ = this.statisticService.getTopCountriesByPopulation('europe', 10);
    this.graphAsia$ = this.statisticService.getTopCountriesByPopulation('asia', 5);
    this.graphAmerica$ = this.statisticService.getTopCountriesByPopulation('america', 7);

    console.log(this.graphAfrique$);
  }
  
  private updatePaginatedPays(): void {
    if (this.pays$) {
      this.paginatedPays$ = this.pays$.pipe(
        map((pays: Country[]) => {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return pays.slice(startIndex, endIndex);
        })
      );
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
        map((pays) => {
          const filteredPays = pays.filter((paysItem) => this.containsSearchText(paysItem));
          this.searchResultsCountSubject.next(filteredPays.length); 
          this.statisticService.updateSearchResultsCount(filteredPays.length);
          return filteredPays;
        })
      );
      this.toastr.success('Recherche effectuée avec succès');
    } else {
   
    }
    this.updatePaginatedPays();
  }
  
 
}

