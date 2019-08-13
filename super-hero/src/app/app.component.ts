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
  constructor(private _backedService: BackendServiceService, private _formBuilder: FormBuilder){
    this.superHeroForm = this._formBuilder.group({
      hero_input: ['']
    });
  }

  ngOnInit(){
    this._backedService.callHero('0 8737626').subscribe(data=>{
      console.log("Data ==> ",data);
      
    })
  }

  setValue(value){
    console.log(value);
    if(!value)
      value = ' '
    this.codeValue += value;
    this.superHeroForm.controls['hero_input'].setValue(this.codeValue)
  }
}
