import { environment } from './../../environments/environment';
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import * as crypto from 'crypto-js';
declare var $: any;
declare var AbaPayway:any;

@Component({
  selector: "app-component-body",
  templateUrl: "./app-component-body.component.html",
  styleUrls: ["./app-component-body.component.scss"]
})
export class AppComponentBodyComponent implements OnInit {
  firstFormGroup: FormGroup;
  isOptional: boolean = false;

  first_name: AbstractControl;
  last_name: AbstractControl;
  nationality: AbstractControl;
  title: AbstractControl;
  phone_number: AbstractControl;
  email: AbstractControl;
  address: AbstractControl;
  city: AbstractControl;
  country: AbstractControl;
  university: AbstractControl;
  zip_code: AbstractControl;
  emergency_contact: AbstractControl;
  emc_phone_number: AbstractControl;
  emc_email: AbstractControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      nationality: [null, Validators.required],
      title: [null, Validators.required],
      phone_number: [null, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      university: [null, Validators.required],
      zip_code: [null, Validators.required],
      emergency_contact: [null, Validators.required],
      emc_phone_number: [null, Validators.required],
      emc_email: [null, Validators.required],
    });
    this.getHash('S002',270.00)
  }

  getHash(transactionId:any,amount:number){
    const info=`${environment.ABA_PAYWAY_MERCHANT_ID}${transactionId}${amount}`
    const hash = crypto.HmacSHA512(info , environment.ABA_PAYWAY_API_KEY);
    const hashInBase64 = crypto.enc.Base64.stringify(hash);
    return hashInBase64
  }

  getUrl(){
    return environment.ABA_PAYWAY_API_URL;
  }

  onCheckOut(){
     AbaPayway.checkout()
  }

}
