var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPass = document.getElementById("userPass");
var welcomeUser = document.getElementById("welcomeUser");

var userNameSignup = document.getElementById("userNameSignup");
var userEmailSignup = document.getElementById("userEmailSignup");
var userPassSignup = document.getElementById("userPassSignup");
var alertMessage = document.getElementById("alertMessage");



var usersList;


if (localStorage.getItem("users_List") != null) {
    usersList = JSON.parse(localStorage.getItem("users_List"));
} else {
    usersList = [];
}

function newUser() {
  var user = {
    name: userNameSignup.value,
    email: userEmailSignup.value,
    pass: userPassSignup.value
  };
  if(validateUserNameRegex(user.name) && validateEmailRegex(user.email) && !checkExist(user)) {
    usersList.push(user);
    localStorage.setItem("users_List", JSON.stringify(usersList));
    alertMessage.innerHTML = `<small class="text-success py-2">Sucess, You've signed Up</small>`;
    redirect_Page("./../index.html");
  }
}

function checkLogIn() {
  for(var i = 0; i< usersList.length; i++) {
    if(usersList[i].name == userName.value && usersList[i].pass == userPass.value) {
      localStorage.setItem('currentUser', JSON.stringify(usersList[i].name))
      alertMessage.innerHTML = `<small class="text-primary">Welcome Back 🖤</small>`;
      redirect_Page("./../homePage.html");
      return true;
    }
  }
  alertMessage.innerHTML = `<small class="text-danger">⚠ Incorrect email or password</small>`;
}


function displayUserName() {
  welcomeUser.innerHTML = `<h3 class="fw-bold">Welcome ${JSON.parse(localStorage.getItem("currentUser"))} 🥳</h3>`;
}


function validateUserNameRegex(value) {
  //at least 4 letters and start with Capital letter and only contains _
  var userNameRegex = /^[A-Z][A-za-z0-9_]{4,}$/;

  if (userNameRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}


function validateUserName() {
  var userNameErrorMessage = document.getElementById("errorMessageName");

  if (validateUserNameRegex(userNameSignup.value)) {
    userNameErrorMessage.classList.replace("d-block", "d-none");
    userNameSignup.classList.replace("is-invalid", "is-valid");
  } else {
    userNameErrorMessage.classList.replace("d-none", "d-block");
    userNameSignup.classList.add("is-invalid");
  }
}


function validateEmailRegex(value) {
  var emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  if (emailRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail() {
  var emailErrorMessage = document.getElementById("errorMessageEmail");

  if (validateEmailRegex(userEmailSignup.value)) {
    emailErrorMessage.classList.replace("d-block", "d-none");
    userEmailSignup.classList.replace("is-invalid", "is-valid");
  } else {
    emailErrorMessage.classList.replace("d-none", "d-block");
    userEmailSignup.classList.add("is-invalid");
  }
}

function checkExist(newUser) {  
  for(var i=0; i < usersList.length; i++) {
    if(usersList[i].email.toLowerCase() == newUser.email.toLowerCase()) {
      alertMessage.innerHTML = `<small class="text-danger">This email is already exist "You can <a href="./../index.html">Signin</a> instead"</small>`;
      return true;
    }
    else {
      return false;
    }
  }
}


function redirect_Page (path) {
  var tID = setTimeout(function () {
      window.location.href = path;
      window.clearTimeout(tID);		// clear time out.
  }, 2000); 
}

/*
function validatePassRegex(value) {
  // var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;
  var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})$/;

  if (passRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validatePass() {
  var passErrorMessage = document.getElementById("errorMessagePass");

  if (validatePassRegex(userPassSignup.value)) {
    passErrorMessage.classList.replace("d-block", "d-none");
    userPassSignup.classList.replace("is-invalid", "is-valid");
  } else {
    passErrorMessage.classList.replace("d-none", "d-block");
    userPassSignup.classList.add("is-invalid");
  }
}
*/