var producto = {}; // va a contener data de PRODUCT_INFO_URL para mostrar info del producto
var productos = {}; // va a contener data de PRODUCTS_URL para mostrar productos relacionados
var comentarios = []; // va a contener data de PRODUCT_INFO_COMMENTS_URL para mostrar comentarios
    

function showImagesGallery(array) {

    let htmlContentToAppend = "";
    // i = 1 para no repetir la img de portada
    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}




// Nuevo comentario:

var starScore = {};


function nvoCom() {
var nuevoComentario = {}; // va a contener el nvo comentario
    // definir fecha y hora de comentario:
comDateTime = new Date();
let year = comDateTime.getFullYear();
let month = comDateTime.getMonth() + 1; // +1 porque Enero es 0
var mes;  
if (month  < 10) { mes  = '0' + month } else { mes = month}; // Agrego un 0 delante si el nro no es de dos cifras
let  day = comDateTime.getDate();
var dia;
if (day < 10) { dia = '0' + day} else { dia = day}; // Agrego un 0 delante si el nro no es de dos cifras
let hour = comDateTime.getHours();
var hora;
if (hour < 10) { hora = '0' + hour} else { hora = hour}; // Agrego 0 delante si el nro no es de dos cifras
let minutes = comDateTime.getMinutes();
var minutos;
if ( minutes < 10) { minutos = '0' + minutes} else { minutos = minutes}; // Agrego 0 delante si el nro no es de dos cifras
let seconds = comDateTime.getSeconds();
var segundos;
if ( seconds < 10) { segundos = '0' + seconds} else { segundos = seconds}; // Agrego 0 delante si el nro no es de dos cifras
    
// Obtengo y guardo los valores:
    nuevoComentario.description = document.getElementById("comentario").value;
    nuevoComentario.score = starScore.value;
    nuevoComentario.user = localStorage.getItem("user");
    nuevoComentario.dateTime = year + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
// Agrego los valores al final 
    comentarios.push(nuevoComentario);
//Guardo los comentarios en local Storage
    localStorage.setItem("comentarios",JSON.stringify(comentarios));
// Llamo funcion para mostrar los comentarios
    mostrar(comentarios);
    document.getElementById("comentario").value = ""; // Limpia el texto del textarea de comentario una vez enviado
    limpiaEstrellas(document.getElementsByName("rating")); // Limpia las estrellas una vez enviado el comentario
    
    function limpiaEstrellas(array){
        for (i = 0; i<array.length; i++) {
            document.getElementsByName("rating")[i].checked = false;
        }
    }
           
    

    
} 
function mostrar(comentarios) {
    let comments = document.getElementById("comments");
    let commentToAppend = "";
    //Si hago el parse no me muestra los comentarios ¿?
    var comentarios = JSON.parse(localStorage.getItem("comentarios")); // Obtengo los comentarios de localStorage
    for (comentario of comentarios) {
        commentToAppend += `
    
    
    <div class="list-group-item-action w-75 m-auto">
    </br>
    <div class="card p-3">
    <div class="mb-2"></div>
        <div class="d-flex justify-content-between align-items-center">
        
        <h5 class="font-weight-bold mb-1"><i class= "fa fa-user-circle m-2" ></i>  ` + comentario.user + ` : </h5>
            <medium>` + showRating(comentario.score) + `</medium>
       </div>
       <p> ` + comentario.description + `</p>
       <small class="text-muted mb-0"> ` + comentario.dateTime + `</small>
    </div>
    </div>`
    
    comments.innerHTML = commentToAppend; // = y no += para que no repita los comentarios
}}

 // Funcion para mostrar estrellas
 function showRating() {
    starsRating = " ";
                                                          
    for (y = 0; y < comentario.score; y++) {
        starsRating += `<i class="fa fa-star" style="color: #F6BA17;"></i>`
    }
    for (x = 0; x < (5 - comentario.score); x++) {
        starsRating += `<i class="fa fa-star"></i>`
    }
    
    return starsRating;
}


// Funcion para carrousel de imagenes del producto
function imgCarousel() {
        
    let carousel = " ";
    let array= producto.images;
        
        for (i = 1 ; i < array.length ; i++) {
        console.log("Empezo carousel"); // Probando si entra ok al for
        
        carousel += `
        
        <div class="carousel-item">
            <img src=" ` + producto.images[i] + `" class="img-thumbnail">
        </div> `
            /* <div class="carousel-item">
                <img class="img-thumbnail" src="` + producto.images[2] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-thumbnail" src="` + producto.images[3] + `" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-thumbnail" src="` + producto.images[4] + `" alt="">
            </div>
        </div>
        `
*/
    }
    document.getElementById("carouselContainer").innerHTML += carousel;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // getJSONData para mostrar info del producto
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            let prodName = document.getElementById("prodName");
            let frontImg = document.getElementById("frontImg"); // img de portada
            let prodTitle = document.getElementById("prodTitle");
            let venididos = document.getElementById("venididos");
            let prodDescr = document.getElementById("prodDescr");

            prodName.innerHTML = producto.name;
            frontImg.src = producto.images[0];
            prodTitle.innerHTML = producto.name + ' - ' + producto.currency + producto.cost;
            venididos.innerHTML = producto.soldCount + ' unidades vendidas';
            prodDescr.innerHTML = ` <br> ` + producto.description;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto.images);
            // Muestro las imagenes en carrousel
            imgCarousel();
        }
        // getJSONData para mostrar productos relacionados
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                var productos = resultObj.data;
                var productosRel = producto.relatedProducts;
                let prodRelAppend = "";
                let prodRel = document.getElementById("prodRel"); // Contenedor donde agregar nvo contenido html (prodRelAppend)

                // forEach method, por cada elemento del array productosRel ejecuta la funcion
                productosRel.forEach(function (e) {
                    let pRelacionado = productos[e];

                    //formato adaptado de cover.html
                    prodRelAppend += `
                   <div class="col-md-4">
                   <!--style min-height: 100% para que tengan tamaño uniforme y no en funcion de cantidad de texto -->
                        <a href="products.html" class="card mb-4 shadow-sm custom-card" style="min-height: 100%">
                            <img class="bd-placeholder-img card-img-top" src= "` + pRelacionado.imgSrc + `"  alt="Producto relacionado"> 
                            <h3 class="m-3">` + pRelacionado.name + `</h3>
                            <hr>
                            <div class="card-body" >
                                 <p class="card-text" style="width:100%;">` + pRelacionado.description + ` </p>
                                 <small class="text-muted"> ` + pRelacionado.soldCount + ` unidades vendidas </small>
                            </div>
                        </a>
                   </div>
                   `
                });
                //Agrego el html a el contenedor div
                prodRel.innerHTML += prodRelAppend;

            }
            // getJSONData para mostrar comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                   comentarios = resultObj.data;
                   mostrar(comentarios);
                    };
                });
            });
        });

       

    
    var usuario = localStorage.getItem("user"); // // Toma el usuario ingresado de localStorage y define variable 'usuario'
    document.getElementById("ingreso").innerHTML = usuario; // inserta var usuario y flecha en dropdown de barra nav
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("avatarImg").innerHTML +=  ` <img src=" `+ localStorage.getItem("avatar")+ ` " width="50" class="rounded-circle m-2">`;
    } else { document.getElementById("avatarImg").innerHTML += ' <i class= "fa fa-user m-2" ></i> '; } // Define imagen de usuario para textarea de comentarios product-info.html
    document.getElementById("uComment").innerHTML += usuario; // Define nombre de usuario para textarea de comentarios product-info.html
    // Avatar para dropdown:
    if (localStorage.getItem("avatar") != null) {
        document.getElementById("ingreso").innerHTML +=  ` <img src=" `+ localStorage.getItem("avatar")+ ` " width="15" class="rounded-circle m-2">`;    
    } else { document.getElementById("ingreso").innerHTML += ' <i class= "fa fa-user m-2" ></i> '; };
});

