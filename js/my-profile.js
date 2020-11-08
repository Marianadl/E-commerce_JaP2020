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
    
   if (localStorage.getItem("newUserData") != undefined) {
        showUserData()
   } else { showNoData() }
});

var userData = {
    name: '',
    age: '',
    number: '',
    country: '',
    email: '',
    img: ''
}




function editData() {
    userData.name = document.getElementById("userName").value;
    userData.age = document.getElementById("edad").value;
    userData.number = document.getElementById("telefono").value;
    userData.country = document.getElementById("selectCountry").value;
    userData.email = document.getElementById("email").value;

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
     
previewFile();
userData.img = document.getElementById("showImg").src;
localStorage.setItem("newUserData", JSON.stringify(userData)); 
showUserData();
        }



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
                if (userData.img != "") {document.getElementById("showImg").src = ` ${userData.img}`} else {
                    document.getElementById("showImg").src = "https://picsum.photos/200/200"; }
            }


function showNoData() {
   document.getElementById("showImg").src = "https://picsum.photos/200/200";
   document.getElementById("showName").innerHTML = "Nombre de usuario";
   document.getElementById("showAge").innerHTML = "Edad";
   document.getElementById("showNumber").innerHTML = "Número de contacto";
   document.getElementById("showCountry").innerHTML = "País";
}


document.getElementById("cerrarSesion").onclick = function () {
    localStorage.removeItem("newUserData");
    console.log("Se eliminó newUserData del localStorage")
}

