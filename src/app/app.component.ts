import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {RegisterPage} from '../pages/register/register';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = RegisterPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            this.checkToken();

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    isRegistered() {
        let token = localStorage.getItem('RegisteredToken');
        if (token == '1') {
            // You have registered, you can go to login.
            this.rootPage = LoginPage;
        }
    }

    checkToken() {
        let token = localStorage.getItem('authenticationToken');

        console.log(token);

        if (token != null) {
            // now you are logged in
            this.rootPage = HomePage;
        } else {
            this.isRegistered();
        }
    }
}
