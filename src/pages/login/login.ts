import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import {UsernameValidator} from  '../../validators/username';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    data: any = {};

    loginForm: FormGroup;

    submitAttempt: boolean = false;

    constructor(public navCtrl: NavController, private http: Http, public formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), UsernameValidator.isValid])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        });
    }

    attemptSave() {
        this.submitAttempt = true;

        if (this.loginForm.valid) {

            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });

            let options = new RequestOptions({
                headers: headers
            });

            let body =
                '&password=' + this.loginForm.value.password +
                '&username=' + this.loginForm.value.username;

            this.http.post('/authenticateUser', body, options)
                .subscribe(data => {
                    this.data.response = data["_body"];

                    if(this.data.response == '1') {
                        console.log("LOGIN HERE");
                    }

                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}
