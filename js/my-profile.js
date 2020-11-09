//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    // Toma el usuario ingresado y lo muestra en la barra nav
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML = usuario;
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("ingreso").innerHTML += ` <img src=" ` + localStorage.getItem("avatar") + ` " width="15" class="rounded-circle m-2">`;
    } else {
        document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> ';
    };

// Obtengo lista de países de const Countries, recorro la lista con un for y los agrego a select
    getJSONData(COUNTRIES).then(function (resultObj) {
        if (resultObj.status === "ok") {
            countriesList = resultObj.data
            var opcionPais = ``;
            for (pais of countriesList) {
                opcionPais += ` <option>${pais.name}</option>
        `
            }
            document.getElementById("selectCountry").innerHTML += opcionPais;
        }
    });
    
    // Si los datos estan en localStorage en newUserData ejecuta showUserData, si no estan ejecuta showNoData
   if (localStorage.getItem("newUserData") != undefined) {
        showUserData()
   } else { showNoData() }

   
document.getElementById("changeInfo").addEventListener("click", function () {
    Swal.fire({
        title: '¿Confirmar cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33a57',
        cancelButtonColor: '#ec9ca7',
        confirmButtonText: 'Sí, cambiar datos'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '',
            'Los cambios se guardaron con éxito',
            'success'
          )
          editData();
        }
      })
})
});

// var contiene datos de usuario
var userData = {
    name: '',
    age: '',
    number: '',
    country: '',
    email: '',
    img: ''
}



// Funcion a ejecutar cuando clickeo botón de 'guardar datos' en ventana modal. Guarda en cada atributo de la var userData los datos ingresados en los inputs de la modal
function editData() {
    userData.name = document.getElementById("userName").value;
    userData.age = document.getElementById("edad").value;
    userData.number = document.getElementById("telefono").value;
    userData.country = document.getElementById("selectCountry").value;
    userData.email = document.getElementById("email").value;

previewFile()
userData.img = document.getElementById("showImg").src;
localStorage.setItem("newUserData", JSON.stringify(userData)); // guardo var userData como string en logalStorage como newUserData
showUserData(); //Ejecuto función para mostrar los datos modificados
        }

 // Función para tomar el file del input showImg y convertirlo a string base64. Cambia el src de img al string base64
 function previewFile() {
    const preview = document.getElementById("showImg");
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
      
    }, false);
  
    if (file) {
     reader.readAsDataURL(file);
    }
  }

//Función para mostrar los datos modificados y guardados en localStorage
function showUserData() {
                let newUserData = localStorage.getItem("newUserData")
                userData = JSON.parse(newUserData);

                if (userData.name != "") {document.getElementById("showName").innerHTML = userData.name; } else {
                    document.getElementById("showName").innerHTML = "Nombre de usuario"}
                if (userData.age != "") {document.getElementById("showAge").innerHTML =+ userData.age + ` años`;} else {
                    document.getElementById("showAge").innerHTML = "Edad";}
                if (userData.number != "") {document.getElementById("showNumber").innerHTML =+ userData.number;} else {
                    document.getElementById("showNumber").innerHTML = "Número de contacto";}
                if (userData.country != "") {document.getElementById("showCountry").innerHTML = userData.country;} else {
                    document.getElementById("showCountry").innerHTML = "País";}
                if (userData.email != "") {document.getElementById("showEmail").href = ` mailto:${userData.email} `;}
                if (userData.img != "") {document.getElementById("showImg").src = ` ${userData.img}`}
            }

// Funcion a ejecutar antes de guardar en localStorage
function showNoData() {
   document.getElementById("showImg").src = "https://picsum.photos/200/200";
   document.getElementById("showName").innerHTML = "Nombre de usuario";
   document.getElementById("showAge").innerHTML = "Edad";
   document.getElementById("showNumber").innerHTML = "Número de contacto";
   document.getElementById("showCountry").innerHTML = "País";
}

// Funcion a ejecutar cuando se cierra sesión para borrar newUserData del localStorage
document.getElementById("cerrarSesion").onclick = function () {
    localStorage.removeItem("newUserData");
    console.log("Se eliminó newUserData del localStorage")
}

