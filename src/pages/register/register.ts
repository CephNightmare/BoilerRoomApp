import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import {EmailValidator} from  '../../validators/email';
import {UsernameValidator} from  '../../validators/username';

import {LoginPage} from '../login/login';

import 'rxjs/add/operator/map';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    data: any = {};
    error: boolean = false;

    @ViewChild('signupSlider') signupSlider: any;

    registerForm: FormGroup;


    constructor(public navCtrl: NavController, private http: Http, public formBuilder: FormBuilder) {
        this.registerForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), UsernameValidator.isValid])],
            email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        });
    }

    ionViewWillEnter() {
        // this.load();
    }

    attemptSave() {
        this.error = true;

        if (this.registerForm.valid) {

            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });

            let options = new RequestOptions({
                headers: headers
            });

            let body =
                'email=' + this.registerForm.value.email +
                '&password=' + this.registerForm.value.password +
                '&username=' + this.registerForm.value.username;


            this.http.post('/insertUser', body, options)
                .subscribe(data => {
                    this.data.response = data["_body"];

                    localStorage.setItem('RegisteredToken', '1');
                    this.navCtrl.push(LoginPage);

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

    next() {
        this.signupSlider.slideNext();
    }

    prev() {
        this.signupSlider.slidePrev();
    }

}
