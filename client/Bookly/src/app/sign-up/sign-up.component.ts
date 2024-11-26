import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sign-up',
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name = new FormControl('')
}
