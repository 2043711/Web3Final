import { Component, OnInit } from '@angular/core';
import { VillesService } from '../villes.service';
import { Ville } from '../ville';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['./liste-ville.component.css']
})
export class ListeVilleComponent implements OnInit {
  villes: Ville[] = []; 
  nomVille: string = "";
  nomRegion: string = "";
  villeToken: string = "";
  errorModifier: Boolean = false;
  errorDelete: Boolean = false;


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
  language = false;
  successMessage = false;

  constructor(private villesService: VillesService, private router: Router) {   }

  ngOnInit(): void {
    this.getVilles();
  }

  getVilles(): void {
    this.nomVille = "";
    this.nomRegion = "";
    this.villesService.getVilles().subscribe(villes => this.villes = villes);
    setTimeout(() => {
      console.log(this.villes);
      if(document.getElementById("title")?.innerHTML == "Les villes du Québec") {
        this.language = true;
      }
    },500);
  }

  getVillesByNom(val: string) {
    console.log(val);
    this.nomRegion = "";
    this.villesService.getVillesByNom(val).subscribe(villes => this.villes = villes);
  }

  getVillesByRegion(val: string) {
    console.log(val);
    this.nomVille = "";
    this.villesService.getVillesByRegion(val).subscribe(villes => this.villes = villes);
  }

  changePage(page: string) {
    this.router.navigate(["/" + page + ""]);
  }

  Succes(){
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 2000);
  }

  deleteVille(id: string | null) {
    if(id == null) return;
    this.villesService.DeleteVille(id, this.ville.token).subscribe(res => this.villeModifier = res);
    setTimeout(() => {
      if(this.villeModifier._id == null) {
        this.errorDelete = true;
        console.log("errorModifier");
        return;
      }
      this.errorDelete = false;
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
      this.villeModifier = this.ville;
      this.getVilles();
      this.Succes();
    }, 1000);
  }
  choice = 0;
  PutDeleteVille() {
    if(this.choice == 1) {
      this.deleteVille(this.ville._id);
    }
    else if(this.choice == 2) {
      this.ModifyVille();
    }
  }

  villeModifier = this.ville;
  ModifyVille() {
    if(this.ville._id == null) return;
    this.villesService.ModifyVille(this.ville._id, this.ville.token, this.ville).subscribe(res => this.villeModifier = res);
    setTimeout(() => {
      if(this.villeModifier._id == null) {
        this.errorModifier = true;
        console.log("errorModifier");
        return;
      }
      this.errorModifier = false;
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
      this.villeModifier = this.ville;
      this.getVilles();
      this.Succes();      
    }, 1000);
  }

  ChangeVille(ville: Ville) {
    this.ville = ville;
  }
}
