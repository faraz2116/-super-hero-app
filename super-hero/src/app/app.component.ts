import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './_services/backend-service/backend-service.service';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'super-hero';
  superHeroForm: FormGroup;
  codeValue: any = '';
  superHero: any;
  errorMesage: any;
  constructor(private _backedService: BackendServiceService, private _formBuilder: FormBuilder){
    this.superHeroForm = this._formBuilder.group({
      hero_input: ['']
    });
  }

  ngOnInit(){
    
  }

  setValue(value){
    console.log(value);
    if(!value)
      value = ' '
    this.codeValue += value;
    this.superHeroForm.controls['hero_input'].setValue(this.codeValue)
  }

  callHero(){
    this.superHero = null
    if(this.codeValue){
      this._backedService.callHero(this.codeValue).subscribe(data=>{
        if(data.code == 0){
          this.errorMesage = data.message;
        }
        if(data.hero){
          this.errorMesage = null
          this.superHero = data.hero;
        }
      },
      err=>{
        console.log(err.error);
        this.errorMesage = err.error.hero
      })
    }else{
      this.errorMesage = 'Please Enter the Code to call the Super Hero'
    }
  }

  clearField(){
    this.codeValue = '';
    this.superHeroForm.controls['hero_input'].reset()
  }
}
