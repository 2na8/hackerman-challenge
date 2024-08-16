import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'wdm-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z]{3,})(?=.*[@]).*$/),
      ],
    ],
  });
}
