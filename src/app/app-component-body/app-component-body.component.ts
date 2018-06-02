import { environment } from './../../environments/environment';
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import * as crypto from 'crypto-js';
import { ApiService } from '../utils.lib';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';
import {startWith, map} from 'rxjs/operators';

declare var $: any;
declare var AbaPayway:any;

@Component({
  selector: "app-component-body",
  templateUrl: "./app-component-body.component.html",
  styleUrls: ["./app-component-body.component.scss"]
})
export class AppComponentBodyComponent implements OnInit {
  value:any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
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
  isTerm:AbstractControl
  

  conference_package: AbstractControl;

  countries: Observable<Customer[]>;;
  countryList: any;

  callingCodes: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {

    
  }


  buildForm(): void {
    this.firstFormGroup = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      nationality: [null,],
      title: [null, ],
      phone_number: [null, Validators.required],
      email: [null, Validators.required,],
      address: [null, ],
      city: [null, ],
      country: [null, Validators.compose([Validators.required,this.validSubject.bind(this)])],
      university: [null, ],
      zip_code: [null, ],
      emergency_contact: [null, ],
      emc_phone_number: [null, ],
      emc_email: [null,],
      isTerm:[false,Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      
    });

    this.thirdFormGroup = this.fb.group({
      // conference_package: [null, Validators.required],
    });

    this.first_name = this.firstFormGroup.controls['first_name'];
    this.last_name = this.firstFormGroup.controls['last_name'];
    this.nationality = this.firstFormGroup.controls['nationality'];
    this.title = this.firstFormGroup.controls['title'];
    this.phone_number = this.firstFormGroup.controls['phone_number'];
    this.email = this.firstFormGroup.controls['email'];
    this.address = this.firstFormGroup.controls['address'];
    this.city = this.firstFormGroup.controls['city'];
    this.country = this.firstFormGroup.controls['country'];
    this.university = this.firstFormGroup.controls['university'];
    this.zip_code = this.firstFormGroup.controls['zip_code'];
    this.emergency_contact = this.firstFormGroup.controls['emergency_contact'];
    this.emc_phone_number = this.firstFormGroup.controls['emc_phone_number'];
    this.emc_email = this.firstFormGroup.controls['emc_email'];
    this.isTerm=this.firstFormGroup.controls['isTerm']

  };

  public validSubject(control: AbstractControl) {
    const value = control.value;
    if (value !== undefined && value !== null && value !== '') {
      this.value=value
    }
    else this.value=null;
  }

  onClear(){
    this.value=null;
    this.country.patchValue(this.value);
    this.callingCodes = null;
  }

  filterSession(name: any) {
    return this.countryList.filter(state => state.name.toLowerCase().includes(name.toLowerCase())
      || state.name.toLowerCase().includes(name.toLowerCase())
      || state.name.toLowerCase().includes(name.toLowerCase()));
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  _selected(event) {
    if (event.option.value) {
      this.callingCodes = '+' + event.option.value.callingCodes[0]
    }
  }

  ngOnInit() {
    this.buildForm();
    
    this.apiService.get(this.apiService.urlGetCountry).then(res => {
      this.countryList = res;
      this.countries = this.country.valueChanges
      .pipe(
        startWith(null)
        ,map(state => state && typeof state === 'object' ? state.name : state)
        ,map(state => state ? this.filterSession(state) : this.countryList.slice())
      )
    });

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
