import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticDataService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private searchResultsCountSource = new BehaviorSubject<number>(0);
   searchResultsCount$ = this.searchResultsCountSource.asObservable();

  constructor(private http: HttpClient) {}

  getCountriesByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => countries.filter(country => country.region === region))
    );
  }

  getTopCountriesByPopulation(region: string, limit: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => {
        const countriesInRegion = countries
          .filter(country => country.region.toLowerCase() === region.toLowerCase());
   console.log(countriesInRegion);
   
        const sortedCountries = countriesInRegion.sort((a, b) => b.population - a.population);
        const topCountries = sortedCountries.slice(0, limit);
        console.log(topCountries);
        return topCountries.map(country => ({ name: country.name.common, population: country.population }));
      })
    );
   }
   private scoreSource = new BehaviorSubject<number>(0);
   score$ = this.scoreSource.asObservable();

   updateScore(newScore: number): void {
      this.scoreSource.next(newScore);
   }
   
   
 
   updateSearchResultsCount(count: number) {
     this.searchResultsCountSource.next(count);
   }
  

  
}