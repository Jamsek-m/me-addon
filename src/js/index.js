/*const addToggleCheckboxToPage = () => {
    const check = `<input type="checkbox" id="${ENABLE_EXTENSION_ID}" checked="checked"/>`;
    const menuh = document.querySelector("#menuh .right");
    menuh.innerHTML += ` - ${check} ext?`;

    const checkboxElem = document.getElementById(ENABLE_EXTENSION_ID);
    checkboxElem.addEventListener("click", enableOrDisableTimeDisplay);
};*/

/*const enableOrDisableTimeDisplay = () => {
    const isChecked = document.getElementById(ENABLE_EXTENSION_ID).checked;
     if (isChecked) {
        console.log("enabled!");
    } else {
        console.log("disabled!");
    }
    console.log("Not yet implemented!");
};*/
// addToggleCheckboxToPage();

// entry point
MainTimeDisplayService.display();
ChangeDatesService.display();
EndOfActionService.display();
