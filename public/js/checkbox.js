function reqCheckOne(){
    //select input checkbox from doc
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // if a checkbox is checked, all required attr are removed.
    for (let i=0; i<checkboxes.length; i++){
        if (checkboxes[i].checked) {
            checkboxes.removeAttribute('required')
        } //end conditional
    } // end for loop
}; //end function

reqCheckOne()

// not working
// ERROR in CONSOLE:
    // (1)
    // p://localhost:3001/public/js/checkbox.js net::ERR_ABORTED 404 (Not Found)
    //(2)
    //Refused to execute script from 'http://localhost:3001/public/js/checkbox.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.

//POSSIBLE SOLUTION?
    // might need to create a custom event
    // https://vanillajstoolkit.com/reference/event-listeners/customevent/