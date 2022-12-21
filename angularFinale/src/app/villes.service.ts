import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville } from './ville';
import { Site } from './site';


@Injectable({
  providedIn: 'root'
})
export class VillesService {
  villeUrl = "http://localhost:3000/ville";

  constructor(private http: HttpClient) { }

  getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.villeUrl);
  }

  getVillesByNom(nom: string): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.villeUrl + "/nom/" + nom);
  }

  getVillesByRegion(region: string): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.villeUrl + "/region/" + region);
  }

  AddVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.villeUrl, ville);
  }

  DeleteVille(id: string, token: string): Observable<Ville> {
    return this.http.delete<Ville>(this.villeUrl + "/" + id + "/" + token);
  }

  ModifyVille(id: string, token: string, ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(this.villeUrl + "/" + id + "/" + token, ville);
  }
}
