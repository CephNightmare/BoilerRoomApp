import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public http: Http) {

    }

    ionViewWillEnter() {
        this.load();
    }

    load() {
        this.http.get('http://www.boilerroomdata.gvandrunen.biz:8080/insert-user.php')
            .map(res => res.json())
            .subscribe(data => {
                console.log(data);
            });
    }

}
