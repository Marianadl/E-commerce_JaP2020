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