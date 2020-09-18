//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 
    // Toma el usuario ingresado y lo muestra en la barra nav
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML =  usuario;
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("ingreso").innerHTML +=  ` <img src=" `+ localStorage.getItem("avatar")+ ` " width="15" class="rounded-circle m-2">`;    
    } else { document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> '; };
});
