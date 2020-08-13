//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
var login = document.getElementById('inicio_sesion');
var register = document.getElementById('crear_cuenta');

function cc() {
    login.style.top = '80%';
    register.style.top = '-50%';
}
function is() {
    login.style.top = '5%';
    register.style.top = '50%';
}

// validación login form

var userName = document.getElementById("userName");
var loginPassword = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");

function checkLoginForm() {
    if ( userName.value == "" || loginPassword.value == "") {
        loginBtn.disabled = true;
        alert("Debe completar todos los campos");
        return false;
    } else {
        loginBtn.disabled = false;
        return true;
    }
}

userName.addEventListener("blur", checkLoginForm, false);
loginPassword.addEventListener("blur", checkLoginForm, false);

// validación register form

var registerUserName = document.getElementById("registerUserName");
var userEmail = document.getElementById("userEmail");
var registerPassword = document.getElementById("registerPassword");
var registerBtn = document.getElementById("registerBtn");

function checkRegisterForm () { 
    if ( registerUserName.value === "" || userEmail.value === "" || registerPassword.value === "") {
        registerBtn.disabled = true;
        alert("Debe completar todos los campos");
        return false;
    } else {
        registerBtn.disabled = false;
        return true;
    }
}

registerUserName.addEventListener("blur", checkRegisterForm, false);
userEmail.addEventListener("blur", checkRegisterForm, false);
registerPassword.addEventListener("blur", checkRegisterForm, false);
