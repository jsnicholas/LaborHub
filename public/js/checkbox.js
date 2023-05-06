// START FUNCTION
function valThis(){
     let checkboxes = document.getElementsByClassName('formcheckbox')
     let isChecked = false;
     for (let i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isChecked = true;
        };
     };
     if (isChecked) {
        //checkboxes.removeAttr('required');
        console.log('Thank you. You selected at least one checkbox: ' , checkboxes);
    } else {
        alert('Please, you must select at least one checkbox!');
    }
}
// REFERENCE: https://stackoverflow.com/questions/22238368/how-can-i-require-at-least-one-checkbox-be-checked-before-a-form-can-be-submitte , https://www.w3schools.com/jsref/event_onclick.asp