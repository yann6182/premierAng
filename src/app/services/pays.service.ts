// pays.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Region } from '../models/region.model';
import { SousRegion } from '../models/sousregion.model';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries) => {
        const uniqueRegions = new Set<string>();
        countries.forEach((country) => {
          if (country.region) {
            uniqueRegions.add(country.region);
          }
        });
        return Array.from(uniqueRegions).map((region) => ({ name: region }));
      })
    );
  }

  getSousRegions(region: Region): Observable<SousRegion[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries) => {
        const uniqueSousRegions = new Set<string>();
        countries
          .filter((country) => country.region === region.name)
          .forEach((country) => {
            if (country.subregion) {
              uniqueSousRegions.add(country.subregion);
            }
          });
        return Array.from(uniqueSousRegions).map((sousregion) => ({ name: sousregion, region: { name: region.name } }));
      })
    );
  }
  getPays(sousRegion: SousRegion): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries) =>
        countries.filter((country) => country.subregion === sousRegion.name)
      )
    );
  }

  getMonnaies(): Observable<string[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries) => {
        const uniqueMonnaies = new Set<string>();
        countries.forEach((country) => {
          if (country.currencies) {
            Object.keys(country.currencies).forEach((currencyCode) => {
              uniqueMonnaies.add(country.currencies[currencyCode].name);
            });
          }
        });
        return Array.from(uniqueMonnaies);
      })
    );
  }
}
