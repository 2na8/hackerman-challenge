import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'wdm-details-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-list.component.html',
  styleUrl: './details-list.component.css',
})
export class DetailsListComponent {
  @Input() title: string = '';
  @Input() items!: any[];
  @Input() itemProperty: string = '';
}
