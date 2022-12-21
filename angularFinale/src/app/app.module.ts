import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnteteComponent } from './entete/entete.component';
import { PiedDePageComponent } from './pied-de-page/pied-de-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AccueilComponent } from './accueil/accueil.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { StatsComponent } from './stats/stats.component';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion'
import { VillesService } from './villes.service';
import {MatInputModule} from '@angular/material/input';
import { CreationVilleComponent } from './creation-ville/creation-ville.component'
import {MatRadioModule} from '@angular/material/radio';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    PiedDePageComponent,
    AccueilComponent,
    ListeVilleComponent,
    StatsComponent,
    CreationVilleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ VillesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
