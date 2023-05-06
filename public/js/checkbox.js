// if user checks at least one input from the list,
// then all "required" attr are removed

let checkboxes = document.querySelectorAll('input[type="checkbox"]');


function reqCheckOne(){
    // if a checkbox is checked, function ends and returns true.
    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked) {
            return true
        }
    }
    //If all checkboxes have been iterated through
        //(which means they are all unchecked), returns false.
    return false
}