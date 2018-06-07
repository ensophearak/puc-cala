import { environment } from './../../environments/environment';
import { Component, OnInit, Inject } from "@angular/core";
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
import { startWith, map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';

import { AngularFirestore, docChanges } from 'angularfire2/firestore';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';


declare var $: any;
declare var AbaPayway: any;

@Component({
  selector: "app-component-body",
  templateUrl: "./app-component-body.component.html",
  styleUrls: ["./app-component-body.component.scss"]
})
export class AppComponentBodyComponent implements OnInit {

  loading = false;

  value: any;
  fdb = firebase.firestore()
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
  affiliate: AbstractControl;
  isTerm: AbstractControl;
  student_id: AbstractControl

  iAgree: AbstractControl

  qty = 1;
  qtyPlus = 1;

  conference_package: AbstractControl;
  countries: Observable<Customer[]>;;
  countryList: any;

  callingCodes: any;

  item: any;
  itemPlue: any;

  tran_id: string;
  amount: number;
  firstname: string;
  lastname: string;
  phone: string;
  aba_email: string;

  titles=[
    {key:0,text:'Dr.'},
    {key:1,text:'Mr.'},
    {key:2,text:'Mis.'},
    {key:3,text:'Ms.'},
    {key:4,text:'None'},
  ]

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private apiService: ApiService,
  ) { }


  ngOnInit() {
    this.buildForm();
    this.apiService.get(this.apiService.urlGetCountry).then(res => {
      this.countryList = res;
      this.countries = this.country.valueChanges
        .pipe(
          startWith(null)
          , map(state => state && typeof state === 'object' ? state.name : state)
          , map(state => state ? this.filterSession(state) : this.countryList.slice())
        )
    });

  }

  onSelectedSpepper(event) {
    if (event.selectedIndex === 1) {
      if (this.firstFormGroup.valid) {
        const currentDate = moment().format('YYYYMMDD');
        this.db.collection<any>('package', ref => ref.where('endDateKey', '>=', currentDate).orderBy('endDateKey'))
          .valueChanges()
          .subscribe(docs => {
            let isStudent = false;
            if ((this.university.value && this.student_id.value) || this.affiliate.value)
              isStudent = true;
            const priceList = docs.filter(m => m.isStudent === isStudent && m.code === 'REGULAR')
            const sortList = _.orderBy(priceList, ['endDateKey'], ['asc']);
            if (sortList) {
              this.item = sortList[0]
            }
            const pricePlusList = docs.filter(m => m.isStudent === isStudent && m.code === 'REGULARPLUS')
            const sortPlusList = _.orderBy(pricePlusList, ['endDateKey'], ['asc']);
            if (sortPlusList) {
              this.itemPlue = sortPlusList[0]
            }
          })
      }
    }
  }

  buildForm(): void {
    this.firstFormGroup = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      nationality: [null,],
      title: [null,],
      phone_number: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null,],
      city: [null,],
      country: [null, Validators.compose([Validators.required, this.validCountry.bind(this)])],
      university: [null,],
      affiliate: [null,],
      zip_code: [null,],
      emergency_contact: [null,],
      emc_phone_number: [null,],
      emc_email: [null, Validators.compose([Validators.email])],
      isTerm: [false, Validators.required],
      student_id: [null]
    });

    this.secondFormGroup = this.fb.group({
      iAgree: [null, Validators.required]
    });
    this.iAgree = this.secondFormGroup.controls['iAgree']


    this.thirdFormGroup = this.fb.group({
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
    this.affiliate = this.firstFormGroup.controls['affiliate'];
    this.zip_code = this.firstFormGroup.controls['zip_code'];
    this.emergency_contact = this.firstFormGroup.controls['emergency_contact'];
    this.emc_phone_number = this.firstFormGroup.controls['emc_phone_number'];
    this.emc_email = this.firstFormGroup.controls['emc_email'];
    this.isTerm = this.firstFormGroup.controls['isTerm'];
    this.student_id = this.firstFormGroup.controls['student_id']

  };

  public validCountry(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    if (value !== undefined && value !== null && value !== '') {
      if (!value.name) {
        return { validKey: true }
      }
    }
  }

  onClear() {
    this.value = null;
    this.country.patchValue(this.value);
    this.callingCodes = null;
  }

  filterSession(name: any) {
    return this.countryList.filter(state => state.name.toLowerCase().includes(name.toLowerCase()));
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  _selected(event) {
    if (event.option.value) {
      this.callingCodes = '+' + event.option.value.callingCodes[0]
    }
  }


  _onCompletedForm(stepper: MatStepper, el) {
    stepper.next()
    el.scrollIntoView();
  }

  _onIAgree(stepper: MatStepper, el) {
    this.iAgree.setValue(true)
    el.scrollIntoView();
    stepper.next();
  }

  getHash() {
    const info = `${environment.ABA_PAYWAY_MERCHANT_ID}${this.tran_id}${this.amount}`
    const hash = crypto.HmacSHA512(info, environment.ABA_PAYWAY_API_KEY);
    const hashInBase64 = crypto.enc.Base64.stringify(hash);
    return hashInBase64
  }

  getUrl() {
    return environment.ABA_PAYWAY_API_URL;
  }

  onCheckOut(isPlus) {

    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.loading = true;
      const ref = this.fdb.collection('settings').doc('invoice')
      const batch = this.fdb.batch()
      let abaPhone = this.phone_number.value;

      ref.get().then(doc => {
        if (doc.exists) {
          const myPhone = this.phone_number.value;
          if (myPhone) {
            const findPhone = myPhone.toString().trim().substring(0, 1) === '0' ? myPhone.substring(1, myPhone.length) : myPhone
            this.phone = this.callingCodes.toString() + findPhone
            abaPhone = '0' + findPhone;
          }

          const prefix = moment().format('YYMMDD') + (doc.data().index + 1).toString()
          this.tran_id = prefix;
          this.amount = isPlus ? this.qtyPlus * this.itemPlue.price : this.qty * this.item.price;
          this.firstname = this.first_name.value;
          this.lastname = this.last_name.value;
          this.phone = abaPhone;

          this.aba_email = this.email.value;
          batch.update(ref, { index: doc.data().index + 1 })
          const key = this.db.createId()
          batch.set(this.fdb.collection('enrollment').doc(key), {
            key: key,
            date: new Date(),
            dateKey: moment().format('YYYYMMDD'),
            ...this.firstFormGroup.value,
            isPlus: isPlus,
            amount: this.amount,
            tran_id: this.tran_id,
            qty: isPlus ? this.qtyPlus : this.qty,
            package: isPlus ? this.itemPlue : this.item,
            isPaid: false,
            status: 'Draft'
          })
          batch.commit().then(() => {
            AbaPayway.checkout()
            this.loading = false;
          }).catch(error => {
            alert(error)
            this.loading = false;
          })
        }
      })
    }
  }

  onPlus(isPlus) {
    if (isPlus)
      this.qtyPlus = this.qtyPlus + 1;
    else
      this.qty = this.qty + 1;
  }

  onRemove(isPlus) {
    if (isPlus) {
      this.qtyPlus = this.qtyPlus - 1;
      if (this.qtyPlus === 0)
        this.qtyPlus = 1;
    }
    else {
      this.qty = this.qty - 1;
      if (this.qty === 0) {
        this.qty = 1
      }
    }

  }

}
