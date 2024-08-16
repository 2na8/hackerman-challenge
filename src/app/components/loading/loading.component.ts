import { Component, Input } from '@angular/core';

import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'wdm-loading',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
