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

// entry point
// addToggleCheckboxToPage();
/*console.log("Server time: ", document.getElementById("jclock").innerText);
console.log("Your time: ", DateObject.fromDate(new Date()).toString());*/

MainTimeDisplayService.display();
ChangeDatesService.display();
EndOfActionService.display();
