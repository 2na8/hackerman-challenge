import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharacterDetails } from '../../interface/starwars';
import { Film } from '../../interface/film';
import { Specie } from '../../interface/species';
import { Starship } from '../../interface/starships';
import { Vehicle } from '../../interface/vehicles';
import { Planet } from '../../interface/planets';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { StarwarsService } from '../../services/starwars/starwars.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { DetailsListComponent } from '../../components/details-list/details-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'wdm-result',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    LoadingComponent,
    DetailsListComponent,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  characterDetails!: CharacterDetails;

  films: Film[] = [];
  species: Specie[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];
  planets: Planet[] = [];

  loading = true;
  pendingRequests = 0;

  router = inject(Router);
  starwarsService = inject(StarwarsService);

  ngOnInit(): void {
    this.characterDetails = this.starwarsService.getData();

    if (!this.characterDetails) {
      this.router.navigate(['/search']);
      return;
    }

    const fetchDetails = <T>(urls: string[], targetArray: T[]) => {
      if (urls?.length) {
        this.pendingRequests++;
        this.starwarsService.getMultipleUrls<T>(urls).subscribe(
          (responses: (T | null)[]) => {
            targetArray.push(
              ...responses.filter(
                (response): response is T => response !== null
              )
            );
            this.checkLoading();
          },
          (error) => {
            console.error('Erro ao fazer requisições', error);
            this.checkLoading();
          }
        );
      }
    };

    fetchDetails<Film>(this.characterDetails.films, this.films);
    fetchDetails<Specie>(this.characterDetails.species, this.species);
    fetchDetails<Starship>(this.characterDetails.starships, this.starships);
    fetchDetails<Vehicle>(this.characterDetails.vehicles, this.vehicles);
    if (this.characterDetails.homeworld) {
      fetchDetails<Planet>([this.characterDetails.homeworld], this.planets);
    }

    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }

  checkLoading() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }
}
