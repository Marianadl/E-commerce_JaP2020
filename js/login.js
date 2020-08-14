//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
var loginOpt = document.getElementById('inicio_sesion');
var registerOpt = document.getElementById('crear_cuenta');


function cc() {
    loginOpt.style.top = '80%';
    registerOpt.style.top = '-50%';
}
function is() {
    loginOpt.style.top = '5%';
    registerOpt.style.top = '50%';
}

//función onClick del login p/ redirección
function onLogin() {
    window.location.href="index.html";
            }; 

//función onClick del register p/ redirección
function onRegister() {
    window.location.href="login.html"
};


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
/*
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
registerPassword.addEventListener("blur", checkRegisterForm, false); */
