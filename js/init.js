//const CATEGORIES_URL = "http://localhost:5555/category" //"https://japdevdep.github.io/ecommerce-api/category/all.json";
//const PUBLISH_PRODUCT_URL = "http://localhost:5555/products_publish" //"https://japdevdep.github.io/ecommerce-api/product/publish.json";
//const CATEGORY_INFO_URL = "http://localhost:5555/category_info" //"https://japdevdep.github.io/ecommerce-api/category/1234.json";
//const PRODUCTS_URL = "http://localhost:5555/products" // "https://japdevdep.github.io/ecommerce-api/product/all.json";
//const PRODUCT_INFO_URL = "http://localhost:5555/products_info" //"https://japdevdep.github.io/ecommerce-api/product/5678.json";
//const PRODUCT_INFO_COMMENTS_URL = "http://localhost:5555/products_comments"//"https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
//const CART_INFO_URL = "http://localhost:5555/cart_info"//"https://japdevdep.github.io/ecommerce-api/cart/654.json";
//const CART_BUY_URL = "http://localhost:5555/cart" //"https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const COUNTRIES = "https://restcountries.eu/rest/v2/all"

const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

// fetch. En cada js que lo necesito lo llamo con el nombre de la var dentro de un addEventListener.
var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// función sign out google
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    window.localStorage.clear()
    console.log('User signed out.');
    location.href ="index.html";
    
  });
}

function newBadge() {
  localStorage.getItem('articulos');
  let prodEnBadge = 0;
  for (i = 0; i < articulos.length; i++) {
      let art = articulos[i];
      prodEnBadge = art.count;
  }
  console.log("Cantidad prod para badge:", prodEnBadge)
  document.getElementById("prodBadge").innerHTML = prodEnBadge;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });

  // Toma el usuario ingresado y lo muestra en la barra nav:
 
    var usuario = localStorage.getItem("user");
    document.getElementById("ingreso").innerHTML =  usuario;
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
      document.getElementById("ingreso").innerHTML +=  ` <img src=" `+ localStorage.getItem("avatar")+ ` " width="15" class="rounded-circle m-2">`;    
  } else { document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> '; };
    
    
});

    // Funcion a ejecutar cuando se cierra sesión para borrar newUserData del localStorage
    document.getElementById("cerrarSesion").onclick = function () {
      localStorage.removeItem("newUserData");
      console.log("Se eliminó newUserData del localStorage")
  }