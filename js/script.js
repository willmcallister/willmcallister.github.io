/*
* Function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateTheme({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }
    if (systemSettingDark.matches) {
        return "dark";
    }
    return "light";
}

function updateTheme(newTheme) {
    // update in local storage
    localStorage.setItem("theme", newTheme);

    // update theme attribute on HTML to switch theme in CSS
    document.querySelector("html").setAttribute("data-theme", newTheme);


    const newAria = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";

    // update button aria-label for screen readers
    button.setAttribute("aria-label", newAria);

    // update the button image
    buttonImg.src = newTheme === "dark" ? "/icons/moon.svg" : "/icons/sun.svg";

    return newTheme;
}


const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const button = document.querySelector("[data-theme-toggle]");
const buttonImg = document.querySelector(".theme-selector");

// update theme with calculated theme
const theme = calculateTheme({ localStorageTheme, systemSettingDark })
let currentTheme = updateTheme(theme);

// add event listener for preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    // new theme that will be changed to
    const newTheme = event.matches ? "dark" : "light";

    // when preference changes, update theme color
    currentTheme = updateTheme(newTheme);
});


button.addEventListener("click", () => {
    // store what new theme will be changed to
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // update theme and store current theme in memory
    currentTheme = updateTheme(newTheme);
});

