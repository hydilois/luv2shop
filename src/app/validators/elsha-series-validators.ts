import { FormControl, ValidationErrors } from "@angular/forms";

export class ElshaSeriesValidators {

    // white space validators
    static notOnlyWhitespace(control: FormControl): ValidationErrors {


        // check if string ony contains white space
        if ((control.value != null) && (control.value.trim().length === 0)) {
            // invalid; return error object
            return { 'notOnlyWhitespace': true }
        } else {
            // valid, return null
            return null;
        }
    }
}
