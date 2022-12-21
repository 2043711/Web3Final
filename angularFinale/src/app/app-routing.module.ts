import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { StatsComponent } from './stats/stats.component';
import { CreationVilleComponent } from './creation-ville/creation-ville.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'liste-ville', component: ListeVilleComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'creation-ville', component: CreationVilleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
