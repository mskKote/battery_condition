import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  IsAuthored: BehaviorSubject<boolean>;
  isAuth: boolean = false;
  constructor(private router: Router, private server: ServerService) {
    let status = server.getUserStatus();
    this.server.IsAuthored.next(status);
    if(status){
      this.isAuth = status;
    }
  }

  authForm: FormGroup
  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  // isSubmitted = false;
  signIn(event: any) {
    // this.isSubmitted = true;
    let user = {
      username: event.target[0].value,
      password: event.target[1].value
    }
    
    if(this.server.getJwtToken()){
      this.router.navigate(['dashboard'])
    } else {
      this.server.login(user).subscribe((resp) => {
        if(resp){
          this.router.navigate(['dashboard'])
        }
      });
    }
  }
}
