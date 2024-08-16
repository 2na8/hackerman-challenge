import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StarwarsService } from '../../services/starwars/starwars.service';
import { CharacterDetails } from '../../interface/starwars';

import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'wdm-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
    LoadingComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  loading: boolean = false;
  characterDetails?: CharacterDetails;
  errorSearch: boolean = false;

  formBuilder = inject(FormBuilder);
  starwarsService = inject(StarwarsService);
  router = inject(Router);

  form = this.formBuilder.group({
    inputSearch: [null, Validators.required],
  });

  search() {
    const character = this.form.controls['inputSearch'].value;

    if (this.form.valid) {
      this.loading = true;
      this.errorSearch = false;

      this.starwarsService.getCharacterByName(character!).subscribe(
        (response: CharacterDetails) => {
          this.loading = false;
          this.characterDetails = response;

          if (!this.characterDetails) {
            this.errorSearch = true;
          } else {
            this.starwarsService.setData(this.characterDetails);
            this.router.navigate(['/result']);
          }
        },
        (error) => {
          this.loading = false;
          this.errorSearch = true;
          console.error('Error fetching character:', error);
        },
        () => {
          this.form.reset();
        }
      );
    }
  }

  ngOnInit() {
    this.form.get('inputSearch')?.valueChanges.subscribe((value) => {
      if (value) {
        this.errorSearch = false;
      }
    });
  }
}
