import { FormControl } from '@angular/forms';

export class EmailValidator {

    static isValid(control: FormControl): any {
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!regExp.test(control.value)) {
            return {"invalidEmail": true};
        }

        if (control.value.length == 0) {
            return {"invalidEmail": true};
        }

        return null;
    }

}