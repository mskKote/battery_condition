import { ServerService } from 'src/app/server.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  IsAuthored: boolean;
  constructor(private fb: FormBuilder, private server: ServerService) { }

  authForm: FormGroup
  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  isSubmitted = false;
  signIn(event: any) {
    this.isSubmitted = true;
    
    let user = {
      username: event.target[0].value,
      password: event.target[1].value
    }
    this.server.login(user);
    console.log('User >> ', user);
  }
}
