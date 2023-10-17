import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasFirstLetterUpperCase(): ValidatorFn {

    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value[0]);

        return !hasUpperCase ? {firstLetterCapital:true}: null;

    }
}