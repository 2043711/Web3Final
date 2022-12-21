import { Component } from '@angular/core';
import { StatistiquesService } from '../statistiques.service';
import { Moyenne } from '../moyenne';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  moyennePopulation: Moyenne[] = [];
  moyenneDensite: Moyenne[] = [];

  constructor(private statsService: StatistiquesService) {}

  ngOnInit(): void {
    this.getMoyennePopulation();
    setTimeout(() => {
      this.getMoyenneDensite();
    }, 100);
  }

  getMoyennePopulation(): void {
    this.statsService.getMoyennePopulation().subscribe(moyennePopulation => this.moyennePopulation = moyennePopulation);
  }

  getMoyenneDensite(): void {
    this.statsService.getMoyenneDensite().subscribe(moyenneDensite => this.moyenneDensite = moyenneDensite);
  }
}
