//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
var loginOpt = document.getElementById('inicio_sesion');
var registerOpt = document.getElementById('crear_cuenta');

// función onclick btn Crear Cuenta
function cc() {
    loginOpt.style.top = '80%';
    registerOpt.style.top = '-60%';
}
// función onclick btn Iniciar Sesion
function is() {
    loginOpt.style.top = '5%';
    registerOpt.style.top = '50%';
}

//función onClick del login p/ redirección
function onLogin() {
    window.location.href="cover.html";
            }; 

//función onClick del register p/ redirección
function onRegister() {
    window.location.href="index.html"
};


// validación login form
var userName = document.getElementById("userName");
var loginPassword = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");


function checkLoginForm() {
    if ( userName.value == "" || loginPassword.value == "") {
        alert("Debe completar todos los campos");
        return false;
    } else {
        return true;
    }
}

// validación register form

var registerUserName = document.getElementById("registerUserName");
var userEmail = document.getElementById("userEmail");
var registerPassword = document.getElementById("registerPassword");
var registerPassword2 = document.getElementById("registerPassword2");
var registerBtn = document.getElementById("registerBtn");
var registerCheckBox = document.getElementById("registerCheckBox");

function checkRegisterForm () { 
    if ( registerUserName.value === "" || userEmail.value === "" || registerPassword.value === "" || registerPassword2.value === "") {
        alert("Debe completar todos los campos");
        return false;
    } 
    if ( registerPassword.value !== registerPassword2.value ) {
        alert("Las contraseñas deben coincidir");
        return false;
    } 
    if (userEmail.validity.typeMismatch) {
        alert("Debe ingresar un correo electrónico válido");
        return false;
    }
    if ( !registerCheckBox.checked) {
        alert("Debe Aceptar los términos y condiciones")
        return false;
    } else {
        return true;
    }
}

