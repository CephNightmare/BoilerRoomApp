import { FormControl } from '@angular/forms';

export class UsernameValidator {

    static isValid(control: FormControl): any {

        if (control.value.length < 4) {
            return {"invalidUsername": true};
        }

        return null;
    }

}