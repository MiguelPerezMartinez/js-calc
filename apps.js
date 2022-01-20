// ====================================================
//  Dark mode
// ====================================================

document.querySelector(".window").addEventListener("click",windowActions);

function windowActions(event){
  // Close, maximize resize
  if(event.target.id == "red"){
    close()
  }else if (event.target.id == "yellow"){
    isMaximized() ? unmaximize() : maximize();
  }else if (event.target.id == "green"){
    minimize()
  }
}

document
  .querySelector('input[type="checkbox"]')
  .addEventListener("click", prueba);

function prueba(event) {
  // dark mode display
  const display = document.querySelector(".display");
  document.body.classList.toggle("dark");
  display.classList.toggle("dark");
  // dark mode inputs
  const inputDisplay = document.querySelector(".display input");
  inputDisplay.classList.toggle("dark");
  // dark mode numbers
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((element) => {
    element.classList.toggle("darknumber");
  });
  // dark mode others
  const buttons = document.querySelectorAll(".darkmode");
  buttons.forEach((element) => {
    element.classList.toggle("dark");
    if (element.value === "=") {
      element.style.color = "rgba(37, 41, 64, 1)";
    }
  });
  // dark mode log
  const liLog = document.querySelectorAll("li");
  if (display.classList.contains("dark")){
    liLog.forEach((element) => {
      element.classList.add("darklog");
    });
  }else{
    liLog.forEach((element) => {
    element.classList.remove("darklog");
  });
  }

}

// ====================================================
// Display data on the input
// ====================================================
// Listener
document.querySelector(".buttons").addEventListener("click", fnDisplayData);
// global varaible
let dataDisplay = "";

function fnDisplayData(event) {
  // console.log(parseInt(event.target.value));
  // console.log(Number.isInteger(parseInt(event.target.value)));

  const $inputDisplay = document.querySelector(".display input");
  switch (event.target.value) {
    case ".":
      // check if point already exists
      if (!$inputDisplay.value.includes(".")) {
        if ($inputDisplay.value === "0") {
          $inputDisplay.value = "0";
          dataDisplay = "0";
        }
        $inputDisplay.value += event.target.value;
        dataDisplay += event.target.value;
      }
      $inputDisplay.value = $inputDisplay.value.slice(0,6);
      break;
    case "C":
      // key C to clean the display
      const $inputDisplaySmall = document.querySelector(".displaysmall input");
      $inputDisplaySmall.value = "0";
      $inputDisplay.value = "0";
      clearDisplay();
      break;
    case "±":
      // change...
      $inputDisplay.value = parseFloat($inputDisplay.value) * -1;
      break;
    case "=":
      // change...
      clearDisplay();
      break;
    default:
      // Display numbers
      if (Number.isInteger(parseInt(event.target.value))) {
        // debugger;
        if (event.target.value === "0" && $inputDisplay.value === "0") {
          dataDisplay = "";
          $inputDisplay.value = "0";
        } else {
          $inputDisplay.value = dataDisplay + event.target.value;
          dataDisplay += event.target.value;
        }
      } else if (
        event.target.value === "+" ||
        event.target.value === "-" ||
        event.target.value === "X" ||
        event.target.value === "÷" ||
        event.target.value === "%"
      ) {
        dataDisplay = "";
      }
      $inputDisplay.value = $inputDisplay.value.slice(0,6);
      break;
  }
  displaySize()
}

function displaySize() {
  let $inputDisplay = document.querySelector(".display input")

  $inputDisplay.value = $inputDisplay.value.slice(0,12);

  if ($inputDisplay.value.length > 6 && $inputDisplay.value.length <= 9) {
    $inputDisplay.style.zoom = 0.7;
  } else if ($inputDisplay.value.length > 9 && $inputDisplay.value.length <= 12) {
    $inputDisplay.style.zoom = 0.5;
  } else {
    $inputDisplay.style.zoom = 1;
  }
}

// ====================================================
// get result of operations
// ====================================================
const opInputs = document.querySelectorAll(".operation");
opInputs.forEach((element) => {
  element.addEventListener("click", FuncionMiguel);
});
// Global variable
let arr = [];
let result = 0;
let arrResults = [];

function FuncionMiguel(event) {
  const $inputDisplay = document.querySelector(".display input");
  // store display value in Array
  arr.push($inputDisplay.value);
  arr.push(event.target.value);

  // small display
  const $inputDisplaySmall = document.querySelector(".displaysmall input");
  $inputDisplaySmall.value = arr.join(" ").toLowerCase();
  // console.log(arr);

  // First value
  result = parseFloat(arr[0]);
  // loop to return results
  if (arr.length > 2) {
    arr.forEach((element, i) => {
      // avoid the last operation in the Array and numbers
      if (!parseFloat(element) && i !== arr.length - 1) {
        switch (element) {
          case "+":
            result += parseFloat(arr[i + 1]);
            break;
          case "-":
            result -= parseFloat(arr[i + 1]);
            break;
          case "X":
            result *= parseFloat(arr[i + 1]);
            break;
          case "÷":
            result /= parseFloat(arr[i + 1]);
            break;
          case "%":
            result %= parseFloat(arr[i + 1]);
            break;
          default:
            break;
        }
      }
    });
  }
  // Display results on the screen
  $inputDisplay.value = result;
  // Data log to an Array
  if (event.target.value === "=") {
    let strLogging = arr.join(" ");
    let logResults = `${strLogging} ${result}`;

    // get DOM elements
    const ListDataLog = document.querySelector("ul");

    // check if empty
    if (logResults !== "") {
      const liLog = document.createElement("li");
      if ($inputDisplay.classList.contains("dark")){
        liLog.classList.add("darklog")
        liLog.textContent = logResults.toLowerCase();
        ListDataLog.appendChild(liLog);
      }else{
        liLog.textContent = logResults.toLowerCase();
        ListDataLog.appendChild(liLog);
      }
    }
  }
  displaySize()
}

// ====================================================
// Log operation
// ====================================================
document.getElementById("btnlog").addEventListener("click", logList);

function logList(event) {
  // get DOM elements
  const $divCalculadora = document.querySelector(".calculadora");
  const $divLog = document.querySelector(".log");

  // change div displayed - calculadora by default
  if ($divCalculadora.classList.contains("show")) {
    $divCalculadora.classList.remove("show");
    $divLog.classList.add("show");
  } else {
    $divCalculadora.classList.add("show");
    $divLog.classList.remove("show");
  }
}


function clearDisplay(){
  dataDisplay = "";
  arr = [];
}