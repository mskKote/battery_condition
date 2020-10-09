import { ServerService } from 'src/app/server.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  IsAuthored:boolean;
  constructor(private fb: FormBuilder, private server: ServerService) {
    server.IsAuthored.subscribe((resp) => (this.IsAuthored = resp));
  }
  authForm: FormGroup;
  isSubmitted  =  false;
  ngOnInit(): void {
    
  }
  get formControls() { return this.authForm.controls; }
  signIn(event){
    this.isSubmitted = true;
    //this.server.login(this.authForm.value);
    console.log(this.authForm.value+" "+event);
  }

}
