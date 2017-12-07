import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import {UsernameValidator} from  '../../validators/username';
import {HomePage} from "../home/home";

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

                    let response = JSON.parse(this.data.response);

                    if (response[0] == this.loginForm.value.username) {
                        localStorage.setItem('authenticationToken', this.data.response);
                        this.navCtrl.push(HomePage);
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }
    }

    ionViewWillEnter() {
        this.checkToken();
    }

    checkToken() {
        var token = localStorage.getItem('authenticationToken');
        if (token != null) {
            // now you are logged in
            console.log(localStorage.getItem('authenticationToken'));
        }
    }
}
