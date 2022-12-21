import { Component } from '@angular/core';
import { Ville } from '../ville';
import { Site } from '../site';
import { VillesService } from '../villes.service';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-creation-ville',
  templateUrl: './creation-ville.component.html',
  styleUrls: ['./creation-ville.component.css']
})
export class CreationVilleComponent {
  FormControl = new FormControl('', [Validators.required]);
  Villes: Ville[] = [];
  site: Site = {
    nom: "",
    description: "",
    addresse: "",
  };

  codePostaux: string = "";
  ville: Ville = {
    _id: null,
    nom: "",
    population: 0,
    codePostal: [],
    superficie: 0,
    longitude: 0,
    latitude: 0,
    altitude: 0,
    region: "",
    densite: 0,
    dateCreation: 0,
    fondateur: "",
    SiteTouristique: [],
    conservateurAuPouvoir: false,
    token: "",
    fondation: null,
    fondationEN: null,
    position: null
  };
  constructor(private villesService: VillesService, private router: Router) { }

  addSite() {
    this.ville.SiteTouristique.push(this.site);
    this.site = {
      nom: "",
      description: "",
      addresse: "",
    };
  }

  addCodePostal() {
    this.ville.codePostal.push(this.codePostaux);
    this.codePostaux = "";
  }
  
  addVille() {
    this.villesService.AddVille(this.ville).subscribe(ville => this.Villes.push(ville));
    setTimeout(() => {
      this.ville = {
        _id: null,
        nom: "",
        population: 0,
        codePostal: [],
        superficie: 0,
        longitude: 0,
        latitude: 0,
        altitude: 0,
        region: "",
        densite: 0,
        dateCreation: 0,
        fondateur: "",
        SiteTouristique: [],
        conservateurAuPouvoir: false,
        token: "",
        fondation: null,
        fondationEN: null,
        position: null
      };
      this.router.navigate(["/liste-ville"]);
    }
      , 2000);
  }
}
