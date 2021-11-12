const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");

const showError = (input, msg) => {
  //input argument store our inputs
  //msg argument store our placeholders
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");
  //every error will add new class "error"
  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkForm = (input) => {
  input.forEach((el) => {
    // input argument from checkForm function stores our array with our inputs
    // el argument is every element in the array
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el, el.placeholder);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      //previusElementSibling.innerText + slice()  - taking name of the input and removing ":"
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} need to have ${min} characters.`
    );
  }
};

const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, `Passwords don't match`);
  }
};

const checkMail = (email) => {
  //for validation we use regex and test()
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    //test email input value with regex value
    clearError(email);
  } else {
    showError(email, `Wrong email`);
  }
};

//this function is counting error from our forms, thx to "error" class which every error is creating
const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;
  //check if el has "error" class
  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });
  //if no error show info that submit success
  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm([username, pass, pass2, email]);
  checkLength(username, 6);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  checkMail(email);
  checkErrors();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  [username, pass, pass2, email].forEach((el) => {
    el.value = "";
    clearError(el);
  });
});
