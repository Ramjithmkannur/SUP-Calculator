let darkMode = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    output = output.replace("%", "/100");
    output = customEval(output);
    display.value = output; 
  } else if (btnValue === "AC") {
    output = "";
    display.value = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
    display.value = output; 
  } else if (btnValue === "theme-toggle") {
    toggleTheme();
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
    display.value = output; 
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value || e.target.innerText));
});

const toggleTheme = () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-theme", darkMode);
  document.querySelector(".buttons").classList.toggle("dark-theme", darkMode);
  document.querySelector(".container").classList.toggle("dark-theme", darkMode);
  display.classList.toggle("dark-bg", darkMode);
  buttons.forEach((button) => {
    button.classList.toggle("dark-bg", darkMode);
  });
  display.value = "";
  output = "";
};

const customEval = (expression) => {
  try {
    return Function(`return ${expression}`)();
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return "Error";
  }
};
