import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moyenne } from './moyenne';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  statsUrl = "http://localhost:3000/stats";

  constructor(private http: HttpClient) { }

  getMoyennePopulation(): Observable<Moyenne[]> {
    return this.http.get<Moyenne[]>(this.statsUrl + "/moypopulation");
  }

  getMoyenneDensite(): Observable<Moyenne[]> {
    return this.http.get<Moyenne[]>(this.statsUrl + "/moydensite");
  }
}
